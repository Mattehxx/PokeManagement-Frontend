import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { product, productDetail } from "../models/product.model";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { ProductService } from "./product.service";
import { productIngredient } from "../models/product-ingredient.model";
import { personalization } from "../models/personalization.model";
import { orderDetail } from "../models/order-detail.model";
import { order } from "../models/order.model";
import { OrderTypeService } from "./order-type.service";
import { PageService } from "./page.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderService extends GenericService<order> {
    cart: Array<productDetail>;
    personalizations: Array<personalization>;
    orderDetails: Array<orderDetail>;
    order: order | undefined;

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public ps: ProductService, public ot: OrderTypeService, public pageServ: PageService) {
        super(http, as);
        this.cart = [];
        this.personalizations = [];
        this.orderDetails = [];
    }

    getCurrentPrice(): number {
        if (!this.cart)
            return 0;

        return this.roundTo2Decimal(this.cart.map(p => p.price).reduce((partial, curr) => partial + curr, 0));
    }

    getCurrentElements(): number {
        return this.cart?.length || 0;
    }

    addToCart(product: product) {
        this.ps.getProductDetail(`Product/Get/${product.id}`).subscribe({
            next: (response) => {
                console.log('RESPONSE', response);
                this.cart?.push(response);
                this.cart[this.cart.length - 1].productCartId = this.cart.length;
                console.log('CART', this.cart);
            },
            error: (error) => {
                this.alert.showError('Errore, riprovare più tardi!');
                console.error(error);
            }
        });
    }

    removeFromCart(product: productDetail) {
        this.cart = this.cart?.filter(p => p.productCartId != product.productCartId);
        this.personalizations = this.personalizations.filter(p => p.productCartId != product.productCartId);
    }

    addPersonalization(product: productDetail, ingredient: productIngredient, qty: number) {
        let index = this.personalizations.findIndex(p => p.productIngredientId == ingredient.id);

        if(index != -1) {
            this.personalizations[index].amount = ingredient.amount;
        }
        else {
            let personalization: personalization = {
                id: 0,
                productCartId: product.productCartId,
                productIngredientId: ingredient.id,
                amount: ingredient.amount
            };
    
            this.personalizations.push(personalization);
        }

        ingredient.amount += qty;
        product.price = this.roundTo2Decimal(product.price + (ingredient.ingredientPrice * qty));

        console.log(this.personalizations);
    }

    private computeOrderDetails() {
        this.orderDetails = [];
        this.cart.forEach(p => {
            this.orderDetails.push({
                id: 0,
                orderId: 0,
                amount: 1,
                productId: p.id,
                price: p.price,
                personalizations: this.personalizations.filter(pers => pers.productCartId === p.productCartId).map(pers => ({
                    id: pers.id,
                    amount: pers.amount,
                    productIngredientId: pers.productIngredientId
                }))
            });
        });

        console.log(this.orderDetails);
    }

    computeOrder() {
        this.computeOrderDetails();

        this.order = {
            id: 0,
            reservationCode: undefined,
            insertDate: new Date().toISOString(),
            execDate: undefined,
            isCompleted: false,
            isDeleted: false,
            orderTypeId: this.ot.orderTypes.find(ot => ot.isActive)!.id,
            mandatorId: this.as.isLogged ? this.as.getUserId() : undefined,
            operatorId: undefined,
            details: this.orderDetails
        };

        this.post(`Order/Add`, this.order).subscribe({
            next: () => {
                this.alert.showSuccess('Ordine eseguito correttamente');
                this.orderComplete();
            },
            error: (error) => {
                this.alert.showError('Non è stato possibile esguire l\'ordine!');
                console.error(error);
            }
        })
    }

    private orderComplete() {
        if(!this.as.isOperator)
            this.as.logout();

        this.pageServ.isInCartPage = false;
        this.pageServ.isInLoginPage = false;
        this.pageServ.isInRegisterPage = false;

        this.cart = [];
        this.personalizations = [];
        this.orderDetails = [];
        this.order = undefined;
    }

    private roundTo2Decimal(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}