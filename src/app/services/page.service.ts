import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'any'})

export class PageService {
    isInLoginPage: boolean = false;
    isInRegisterPage: boolean = false;
    isInCartPage: boolean = false;

    constructor(public as: AuthService) {}

    showHomePage(): boolean { return !this.isInLoginPage && !this.isInRegisterPage && !this.isInCartPage && !this.as.isAdmin }
    showLoginPage(): boolean { return this.isInLoginPage }
    showRegisterPage(): boolean { return !this.isInLoginPage && this.isInRegisterPage && !this.as.isLogged }
    showAdminHomePage(): boolean { return !this.isInLoginPage && !this.isInRegisterPage && !this.isInCartPage && this.as.isAdmin }
    showCartPage(): boolean { return !this.isInLoginPage && !this.isInRegisterPage && !this.as.isAdmin && this.isInCartPage }

    returnToHomePage(): void {
        this.isInLoginPage = false;
        this.isInRegisterPage = false;
        this.isInCartPage = false;
    }
}