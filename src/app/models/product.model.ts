import { element } from "./element.model";
import { productIngredient, productIngredientBasic } from "./product-ingredient.model";

export interface product {
    id: number;
    name: string;
    description: string;
    price: number;
    isDeleted: boolean;
    productIngredients: Array<productIngredientBasic>;
}
export interface productAdmin extends product{
    productType: element;
    productIngredients: Array<productIngredientBasic>;
}

export interface productDetail {
    id: number;
    name: string;
    description: string;
    price: number;
    isDeleted: boolean;
    productCartId: number;
    productIngredients: Array<productIngredient>
}

export interface toAddProduct extends product {
    productTypeId: number;
    productIngredients: Array<productIngredient>;
}