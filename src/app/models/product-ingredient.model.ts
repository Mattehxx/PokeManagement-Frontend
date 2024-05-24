export interface productIngredientBasic{
    id: number;
    ingredientName: string;
    amount: number;
    maxAllowed: number;
    isIncluded: boolean;
}

export interface productIngredient {
    id: number;
    productId: number;
    ingredientId: number;
    ingredientName: string;
    amount: number;
    maxAllowed: number;
    isIncluded: boolean;
}