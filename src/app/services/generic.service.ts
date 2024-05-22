import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class GenericService<T> {
    baseRoot: string = 'http://localhost:5064/api/';

    constructor(protected http: HttpClient, protected as: AuthService) {
        
    }

    getAll(url: string): Observable<Array<T>> {
        return this.http.get<Array<T>>(this.baseRoot + url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    getSingle(url: string): Observable<T> {
        return this.http.get<T>(this.baseRoot + url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    getByType(url: string): Observable<Array<T>> {
        return this.http.get<Array<T>>(this.baseRoot + url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    post(url: string, model: T): Observable<T> {
        return this.http.post<T>(this.baseRoot + url, model, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    put(url: string, model: T): Observable<T> {
        return this.http.put<T>(this.baseRoot + url, model, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    delete(url: string): Observable<T> {
        return this.http.delete<T>(this.baseRoot + url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }
}