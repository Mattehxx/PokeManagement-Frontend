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
}export interface productIngredient {
    id: number;
    productId: number;
    ingredientId: number;
    ingredientName: string;
    amount: number;
    maxAllowed: number;
    isIncluded: boolean;
}