import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { element, orderType } from "../models/element.model";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderTypeService extends GenericService<element> {
    orderTypes: Array<orderType>;

    constructor(http: HttpClient, as: AuthService) {
        super(http, as);
        this.orderTypes = [];
    }
}