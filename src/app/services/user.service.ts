import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { PageService } from "./page.service";
import { user } from "../models/auth.model";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class UserService extends GenericService<user> {
    allRoles = {
        Admin: 'Admin',
        Operator: 'Operator',
        Customer: 'Customer'
    };

    showDeleted: boolean = false;
    allUsers: Array<user>;

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public ps: PageService) {
        super(http, as);
        this.allUsers = [];
    }

    rolesToArray(): Array<string> {
        return Object.keys(this.allRoles);
    }
}