import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { order, orderForManagement } from "../models/order.model";
import { PageService } from "./page.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderForManagementService extends GenericService<orderForManagement> {
    orders: Array<order> | undefined;

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public pageServ: PageService) {
        super(http, as);
        
    }

    getOrderToExec(): Observable<Array<order>> {
        return this.http.get<Array<order>>(`${this.baseRoot}Order/GetOrderToExec`, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    private roundTo2Decimal(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}