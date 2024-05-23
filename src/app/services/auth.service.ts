import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { login, loginResult, register, registerResult } from "../models/auth.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'any'})

export class AuthService {
    baseRoot: string = 'http://localhost:5064/api/Authentication/';
    isLogged: boolean = false;
    username: string = 'Accedi';
    isAdmin: boolean = false;
    isOperator: boolean = false;
    isCustomer: boolean = false;

    constructor(private http: HttpClient) {}

    login(model: login): Observable<loginResult> {
        return this.http.post<loginResult>(`${this.baseRoot}login`, model).pipe(tap(result => {
            localStorage.setItem('login', JSON.stringify(result));
            this.getUserRole();
            this.isLogged = true;
            this.username = result.username;
        }));
    }

    logout(): boolean {
        try {
            localStorage.removeItem('login');
            this.isLogged = false;
            this.username = 'Accedi';
            
            return true;
        } catch (error) {
            return false;
        }
    }

    register(model: register): Observable<registerResult> {
        return this.http.post<registerResult>(`${this.baseRoot}register`, model);
    }

    registerOperator(model: register): Observable<registerResult> {
        return this.http.post<registerResult>(`${this.baseRoot}register-operator`, model);
    }

    registerAdmin(model: register): Observable<registerResult> {
        return this.http.post<registerResult>(`${this.baseRoot}register-admin`, model);
    }

    private parseLoginToObject(): loginResult | undefined {
        let json = localStorage.getItem('login');
        if (json == null)
            return undefined;

        return JSON.parse(json);
    }

    getAuthHeader(): string {
        let parsedJSON = this.parseLoginToObject();
        if(!parsedJSON)
            return '';
        
        return `Bearer ${parsedJSON.token}`
    }

    isUserLogged(): boolean {
        let parsedJSON = this.parseLoginToObject();
        if(!parsedJSON) {
            this.isLogged = false;
            return false;
        }

        if (Date.parse(parsedJSON.expiration) <= Date.now()) {
            this.isLogged = false;
            return false;
        }

        this.isLogged = true;
        this.username = parsedJSON.username;

        return true;
    }

    getUserRole(): void {
        if(!this.isUserLogged())
            return;

        let parsedJSON = this.parseLoginToObject();
        if(!parsedJSON)
            return;

        switch(parsedJSON.role) {
            case 'Admin':
                this.isAdmin = true;
                break;
            case 'Operator':
                this.isOperator = true;
                break;
            case 'Customer':
                this.isCustomer = true;
                break;
            default:
                break;
        }
    }
}