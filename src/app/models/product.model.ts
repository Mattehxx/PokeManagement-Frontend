import { element } from "./element.model";
import { productIngredient } from "./product-ingredient";

import { productIngredient } from "./ingredient.model";

export interface product {
    productId: number;
    name: string;
    description: string;
    price: number;
    isDeleted: boolean;
}
export interface productAdmin extends product{
    productType: element;
    productIngredients: Array<productIngredient>;
}

export interface productDetail extends product {
    productCartId: number;
    productIngredients: Array<productIngredient>
}