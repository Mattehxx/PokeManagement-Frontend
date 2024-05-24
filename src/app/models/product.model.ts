import { element } from "./element.model";
import { productIngredient } from "./product-ingredient";

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