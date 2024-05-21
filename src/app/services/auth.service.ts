import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { login, loginResult, register, registerResult } from "../models/auth.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'any'})

export class AuthService {
    constructor(private http: HttpClient) {

    }

    login(model: login): Observable<loginResult> {
        return this.http.post<loginResult>('http://localhost:5030/api/Authenticate/login', model).pipe(tap(result => {
            localStorage.setItem("login", JSON.stringify(result));
        }));
    }

    register(model: register): Observable<registerResult> {
        return this.http.post<registerResult>('http://localhost:5030/api/Authenticate/register', model);
    }

    registerAdmin(model: register): Observable<registerResult> {
        return this.http.post<registerResult>('http://localhost:5030/api/Authenticate/register-admin', model);
    }

    getAuthHeader(): string {
        let json = localStorage.getItem('login');
        if(json != null) {
            return `Bearer ${JSON.parse(json).token}`
        }
        return '';
    }

    isUserLogged(): boolean {
        let json = localStorage.getItem('login');
        if(json == null)
            return false;

        let tokenItems = JSON.parse(json);
        if (tokenItems.expiration <= Date.now())
            return false;

        return true;
    }
}