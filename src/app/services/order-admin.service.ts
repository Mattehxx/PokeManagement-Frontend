import { Injectable, model } from "@angular/core";
import { GenericService } from "./generic.service";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { order, orderForManagement, orderHistoryModel } from "../models/order.model";
import { PageService } from "./page.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class OrderAdminService extends GenericService<orderForManagement> {
    allOrders: Array<orderForManagement>;
    filteredOrders: Array<orderForManagement>;
    showNotExec: boolean = false;
    dates: orderHistoryModel;

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public pageServ: PageService) {
        super(http, as);
        this.allOrders = [];
        this.filteredOrders = [];
        this.dates = {
            startDate: '',
            endDate: ''
        }
    }

    setFilteredList(): void {
        if(!this.showNotExec)
            this.filteredOrders = this.allOrders.filter(o => o.isCompleted);
        else 
            this.filteredOrders = this.allOrders;
    }

    execHistoryStoredProcedure(): Observable<orderHistoryModel> {
        return this.http.post<orderHistoryModel>(this.baseRoot + 'Order/SaveOrderHistory', this.dates, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    private roundTo2Decimal(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}