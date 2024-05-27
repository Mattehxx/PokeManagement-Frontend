import { orderDetail } from "./order-detail.model";

export interface order {
    id: number;
    reservationCode: string | undefined;
    insertDate: string;
    execDate: string | undefined;
    isCompleted: boolean;
    isDeleted: boolean;
    orderTypeId: number;
    mandatorId: string | undefined;
    operatorId: string | undefined;
    details: Array<orderDetail>
}