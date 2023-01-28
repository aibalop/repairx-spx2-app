import {ChargeOrId, CustomerOrId, UserOrId, WorkOrId} from '../../../core/utils/app-types.util';

export interface IOrderRepair {
    _id?: string;
    orderId: string;
    customer: ICustomerOrderRepair;
    works: Array<IWorkOrderRepair>;
    charges: Array<IChargeOrderRepair>;
    devices: Array<IDeviceOrderRepair>;
    deliveryDate: string;
    status: string;
    isPaid: boolean;
    paidAt?: string;
    remainingAmount: number;
    discountAmount: number;
    advanceAmount: number;
    subtotalAmount: number;
    totalAmount: number;

    deleted?: boolean;
    createdBy?: UserOrId;
    updatedBy?: UserOrId;
    deletedBy?: UserOrId;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ICustomerOrderRepair {
    customerId: CustomerOrId;
    name: string;
    lastName: string;
    surName: string;
    phone: string;
    email: string;
}

export interface IWorkOrderRepair {
    workId: WorkOrId;
    name: string;
    amount: number;
    notes?: string;
}

export interface IChargeOrderRepair {
    chargeId: ChargeOrId;
    name: string;
    amount: number;
    notes?: string;
}

export interface IDeviceOrderRepair {
    device: {
        deviceId: string;
        name: string;
    };
    brand: {
        brandId: string;
        name: string;
    };
    model: string;
    accessory: string;
    itsOn: boolean;
    cards: string;
    password?: string;
    details: string;
    customerReport: string;
    finalDiagnosis: string;
    warrantyDays: number;
    status: string;
}
