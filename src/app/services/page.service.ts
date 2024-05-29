import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'any' })

export class PageService {
    isInLoginPage: boolean = false;
    isInRegisterPage: boolean = false;
    isInCartPage: boolean = false;
    isInOrderManagementPage: boolean = false;

    isLoginFromCartPage: boolean = false;

    //#region HOME-ADMIN
    isProdViewMode: boolean = false;
    isIngredientViewMode: boolean = false;
    isUserViewMode: boolean = false;
    idOrdersHistoryViewMode: boolean = false;
    //#endregion

    constructor(public as: AuthService) { }

    showHomePage(): boolean { return !this.isInLoginPage && !this.isInRegisterPage && !this.isInCartPage && !this.as.isAdmin && !this.isInOrderManagementPage }
    showLoginPage(): boolean { return this.isInLoginPage }
    showRegisterPage(): boolean { return !this.isInLoginPage && this.isInRegisterPage && !this.as.isLogged }
    showAdminHomePage(): boolean { return !this.isInLoginPage && !this.isInRegisterPage && !this.isInCartPage && this.as.isAdmin }
    showCartPage(): boolean { return !this.isInLoginPage && !this.isInRegisterPage && !this.as.isAdmin && this.isInCartPage }
    showOrderManagementPage(): boolean { return this.isInOrderManagementPage && !this.isInLoginPage && !this.isInRegisterPage && !this.isInCartPage && this.as.isOperator }

    returnToHomePage(): void {
        this.isInLoginPage = false;
        this.isInRegisterPage = false;
        this.isInCartPage = false;
        this.isInOrderManagementPage = false;

        this.isProdViewMode = false;
        this.isIngredientViewMode = false;
        this.isUserViewMode = false;
        this.idOrdersHistoryViewMode = false;
    }

    returnToLoginPage(): void {
        this.isInLoginPage = true;
        this.isInRegisterPage = false;
        this.isInCartPage = false;
        this.isInOrderManagementPage = false;
    }

    returnToCartPage(): void {
        this.isInLoginPage = false;
        this.isInRegisterPage = false;
        this.isInCartPage = true;
        this.isInOrderManagementPage = false;
        this.isLoginFromCartPage = false;
        this.as.loginDenied = true;
    }
}