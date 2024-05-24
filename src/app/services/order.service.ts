import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { product, productDetail } from "../models/product.model";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { ProductService } from "./product.service";
import { productIngredient } from "../models/product-ingredient.model";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderService extends GenericService<product> {
    cart: Array<productDetail>;
    cartBtn = document.getElementById('btn-cart');

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public ps: ProductService) {
        super(http, as);
        this.cart = [];
    }

    getCurrentPrice(): number {
        if (!this.cart)
            return 0;

        return this.cart.map(p => p.price).reduce((partial, curr) => partial + curr, 0);
    }

    getCurrentElements(): number {
        return this.cart?.length || 0;
    }

    addToCart(product: product) {
        this.ps.getProductDetail(`Product/Get/${product.productId}`).subscribe({
            next: (response) => {
                this.cart?.push(response);
                this.cart[this.cart.length - 1].productCartId = this.cart.length;
            },
            error: (error) => {
                this.alert.showError('Errore, riprovare più tardi!');
                console.error(error);
            }
        })
        //this.alert.showInfo(`${product.name} aggiunto al carrello`);
    }

    removeFromCart(product: productDetail) {
        this.cart = this.cart?.filter(p => p.productCartId != product.productCartId);
        //this.alert.showInfo(`${product.name} rimossso dal carrello`);
    }

    addIngredient(product: productDetail , ingredient: productIngredient) {
        
    }
}