import { productIngredient } from "./product-ingredient.model";

export interface personalization extends newPersonalization {
    productCartId: number;
}

export interface newPersonalization {
    id: number;
    productIngredientId: number;
    amount: number;
}

export interface personalizationForManagement extends newPersonalization {
    productIngredient: productIngredient;
}