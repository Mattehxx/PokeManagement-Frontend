import { newPersonalization, personalization, personalizationForManagement } from "./personalization.model";
import { product } from "./product.model";

export interface orderDetail {
    id: number;
    orderId: number;
    productId: number;
    amount: number;
    price: number;
    personalizations: Array<newPersonalization>
}

export interface orderDetailForManagement {
    id: number;
    orderId: number;
    productId: number;
    amount: number;
    price: number;
    product: product;
    personalizations: Array<personalizationForManagement>;
}