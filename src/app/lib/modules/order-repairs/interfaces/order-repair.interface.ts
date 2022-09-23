import { ICharge } from "../../catalogs/charges/interfaces/charge.interface";
import { IWork } from "../../catalogs/works/interfaces/work.interface";
import { ICustomer } from "../../customers/interfaces/customer.interface";
import { IUser } from "../../users/interfaces/user.interface";

export interface IOrderRepair {
    _id?: string;
    orderId: string;
    customer: ICustomerOrderRepair;
    works: Array<IWorkOrderRepair>;
    charges: Array<IChargeOrderRepair>;
    devices: Array<IDeviceOrderRepair>;
    deliveryDate: string | Date;
    status: string;
    isPaid: boolean;
    remainingAmount: number;
    discountAmount: number;
    advanceAmount: number;
    subtotalAmount: number;
    totalAmount: number;

    deleted?: boolean;
    createdBy?: string | IUser;
    updatedBy?: string | IUser;
    deletedBy?: string | IUser;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string;
}

interface ICustomerOrderRepair {
    customerId: string | ICustomer;
    name: string;
    lastName: string;
    surName: string;
    phone: string;
    email: string;
}

interface IWorkOrderRepair {
    workId: string | IWork;
    name: string;
    amount: number;
    notes?: string;
}

interface IChargeOrderRepair {
    chargeId: string | ICharge;
    name: string;
    amount: number;
    notes?: string;
}

interface IDeviceOrderRepair {
    deviceId: string;
    name: string;
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
