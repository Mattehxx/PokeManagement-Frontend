import { newPersonalization, personalization } from "./personalization.model";

export interface orderDetail {
    id: number;
    orderId: number;
    productId: number;
    amount: number;
    price: number;
    personalizations: Array<newPersonalization>
}