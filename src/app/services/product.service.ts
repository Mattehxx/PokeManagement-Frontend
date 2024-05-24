import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { product, productDetail } from "../models/product.model";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class ProductService extends GenericService<product> {
    getProductDetail(url: string): Observable<productDetail> {
        return this.http.get<productDetail>(this.baseRoot + url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }
}