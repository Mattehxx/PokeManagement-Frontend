import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { orderForManagement } from "../models/order.model";
import { PageService } from "./page.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderForManagementService extends GenericService<orderForManagement> {
    

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public pageServ: PageService) {
        super(http, as);
        
    }

    private roundTo2Decimal(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}