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
    textInp: string = '';
    allUsers: Array<user>;
    filteredUsers: Array<user>;

    constructor(http: HttpClient, as: AuthService, public alert: AlertService, public ps: PageService) {
        super(http, as);
        this.allUsers = [];
        this.filteredUsers = [];
    }

    setFilteredList(): void {
        if(!this.showDeleted)
            this.filteredUsers = this.allUsers.filter(u => !u.isDeleted);
        else 
            this.filteredUsers = this.allUsers;

        this.filteredUsers = this.filteredUsers.filter(u => u.username.includes(this.textInp));
    }

    rolesToArray(): Array<string> {
        return Object.keys(this.allRoles);
    }
}