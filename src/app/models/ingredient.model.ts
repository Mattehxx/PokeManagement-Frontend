import { element } from "./element.model";

export interface ingredient{
    id: number,
    name: string,
    additionalCost: number,
    description: string,
    allergen: boolean,
    calories: number,
    isDeleted: boolean,
    ingredientTypeId: number,
    ingredientType: element
}