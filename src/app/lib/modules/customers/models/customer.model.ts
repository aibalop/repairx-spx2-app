import { IAddress } from "src/app/lib/modules/customers/interfaces/address.interface";
import { ICustomer } from "../interfaces/customer.interface";

export class Customer implements ICustomer {

    _id?: string;
    name: string;
    lastName: string;
    surName?: string;
    slug: string;
    phone: string;
    email?: string;
    address?: IAddress;
    createdAt: Date | string;
    updatedAt: Date | string;

    constructor(data: ICustomer) {
        Object.assign(this, data);
    }

    getFullName(): string {
        return `${this.name} ${this.lastName}${this.surName ? ' ' + this.surName : ''}`;
    }

}
