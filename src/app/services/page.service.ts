import { Injectable } from "@angular/core";

@Injectable({providedIn: 'any'})

export class PageService {
    isInLoginPage: boolean = false;
    isInRegisterPage: boolean = false;
}