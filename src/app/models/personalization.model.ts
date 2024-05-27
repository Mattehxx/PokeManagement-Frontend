export interface personalization extends newPersonalization {
    productCartId: number;
}

export interface newPersonalization {
    id: number;
    productIngredientId: number;
    amount: number;
}