export interface productIngredientBasic{
    id: number;
    ingredientName: string;
    amount: number;
    maxAllowed: number;
    isIncluded: boolean;
    isDeleted:boolean | undefined;
}

export interface productIngredient {
    id: number;
    productId: number;
    ingredientId: number;
    ingredientName: string;
    ingredientPrice: number;
    amount: number;
    maxAllowed: number;
    isIncluded: boolean;
    isDeleted:boolean | undefined;
}