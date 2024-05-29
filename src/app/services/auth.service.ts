import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { login, loginResult, register, registerResult, user } from "../models/auth.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'any'})

export class AuthService {
    //baseRoot: string = 'https://pw3-as-backend.azurewebsites.net/api/Authentication/';
    //baseRoot: string = 'http://localhost:5064/api/Authentication/';
    baseRoot: string = `${environment.connectionString}Authentication/`;
    isLogged: boolean = false;
    isAdmin: boolean = false;
    isOperator: boolean = false;
    isCustomer: boolean = false;

    userLogged: user | undefined;

    constructor(private http: HttpClient) {}

    login(model: login): Observable<loginResult> {
        return this.http.post<loginResult>(`${this.baseRoot}login`, model).pipe(tap(result => {
            localStorage.setItem('login', JSON.stringify(result));
            this.getUserRole();
        }));
    }

    logout(): boolean {
        try {
            localStorage.removeItem('login');
            this.isLogged = false;
            this.userLogged = undefined;
            
            this.getUserRole();

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

    getUserById(id: string): Observable<user> {
        return this.http.get<user>(`${this.baseRoot}GetUser/${id}`);
    }

    private parseLoginToObject(): loginResult | undefined {
        let json = localStorage.getItem('login');
        if (json == null)
            return undefined;

        return JSON.parse(json);
    }

    getUserId() {
        return this.parseLoginToObject()?.id;
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
            this.isAdmin = false;
            this.isOperator = false;
            this.isCustomer = false;
            return false;
        }

        if (Date.parse(parsedJSON.expiration) <= Date.now()) {
            this.isLogged = false;
            this.isAdmin = false;
            this.isOperator = false;
            this.isCustomer = false;
            return false;
        }

        this.isLogged = true;

        this.getUserById(parsedJSON.id).subscribe({
            next: (response) => {
                this.userLogged = response;
            }, 
            error: (error) => {
                console.error(error);
            }
        });

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
                this.isAdmin = false;
                this.isOperator = false;
                this.isCustomer = false;
                break;
        }
    }
}