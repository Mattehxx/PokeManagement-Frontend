import { productIngredient } from "./ingredient.model";

export interface product {
    productId: number;
    name: string;
    description: string;
    price: number;
    isDeleted: boolean;
}

export interface productDetail extends product {
    productCartId: number;
    productIngredients: Array<productIngredient>
}