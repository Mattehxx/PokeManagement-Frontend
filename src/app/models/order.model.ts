export interface order {
    orderId: number;
    reservationCode: string;
    insertDate: string;
    execDate: string;
    isCompleted: boolean;
    isDeleted: boolean;
    typeId: number;
    mandatorId: string | undefined;
    operatorId: string;
}