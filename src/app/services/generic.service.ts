import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class GenericService<T> {
    constructor(private http: HttpClient, private as: AuthService) {
        
    }

    getAll(url: string): Observable<Array<T>> {
        return this.http.get<Array<T>>(url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    getSingle(url: string): Observable<T> {
        return this.http.get<T>(url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    getByType(url: string): Observable<Array<T>> {
        return this.http.get<Array<T>>(url, { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    post(url: string, model: T): Observable<T> {
        return this.http.post<T>(url, model);
    }

    put(url: string, model: T): Observable<T> {
        return this.http.put<T>(url, model);
    }

    delete(url: string): Observable<T> {
        return this.http.delete<T>(url);
    }
}