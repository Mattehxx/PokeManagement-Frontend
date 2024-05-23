import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { product } from "../models/product.model";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "./alert.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderService extends GenericService<product> {
    cart: Array<product> | undefined;
    cartBtn = document.getElementById('btn-cart');

    constructor(http: HttpClient, as: AuthService, public alert: AlertService) {
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
        this.cart?.push(product);

        //this.alert.showInfo(`${product.name} aggiunto al carrello`);
    }

    removeFromCart(product: product) {
        this.cart = this.cart?.filter(p => p.productId != product.productId);
        //this.alert.showInfo(`${product.name} aggiunto al carrello`);
    }
}