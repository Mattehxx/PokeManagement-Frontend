import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { element } from "../models/element.model";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class ProductTypeService extends GenericService<element> {
    
}