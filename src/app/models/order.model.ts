import { element } from "./element.model";
import { orderDetail, orderDetailForManagement } from "./order-detail.model";

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
    details: Array<orderDetail>;
}

export interface orderForManagement {
    id: number;
    reservationCode: string | undefined;
    insertDate: string;
    execDate: string | undefined;
    isCompleted: boolean;
    isDeleted: boolean;
    orderTypeId: number;
    orderType: element;
    mandatorId: string | undefined;
    operatorId: string | undefined;
    details: Array<orderDetailForManagement>;
}

export interface orderHistoryModel {
    startDate: string;
    endDate: string;
}