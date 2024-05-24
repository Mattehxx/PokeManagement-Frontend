import { element } from "./element.model";
import { productIngredient, productIngredientBasic } from "./product-ingredient.model";

export interface product {
    productId: number;
    name: string;
    description: string;
    price: number;
    isDeleted: boolean;
}
export interface productAdmin extends product{
    productType: element;
    productIngredients: Array<productIngredientBasic>;
}

export interface productDetail extends product {
    productCartId: number;
    productIngredients: Array<productIngredient>
}