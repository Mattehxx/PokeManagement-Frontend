import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { product } from "../models/product.model";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class ProductService extends GenericService<product> {
    
}