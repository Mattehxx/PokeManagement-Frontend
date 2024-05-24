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

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderService extends GenericService<product> {
    cart: Array<productDetail>;
    personalizations: Array<personalization>;

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public ps: ProductService) {
        super(http, as);
        this.cart = [];
        this.personalizations = [];
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
        this.ps.getProductDetail(`Product/Get/${product.productId}`).subscribe({
            next: (response) => {
                this.cart?.push(response);
                this.cart[this.cart.length - 1].productCartId = this.cart.length;
                console.log(this.cart);
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

    private roundTo2Decimal(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}