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
import { ingredient } from "../models/ingredient.model";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class IngredientService extends GenericService<ingredient> {
    allIngredients: Array<ingredient> = [];

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public pageServ: PageService) {
        super(http, as);
    }

   

    private roundTo2Decimal(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}