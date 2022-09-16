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

    getPhoneFormat(): string {
        try {
            return `${this.phone.substring(0, 3)}-${this.phone.substring(3, 6)}-${this.phone.slice(6, 8)}-${this.phone.substring(8, 10)}`;
        } catch (error) {
            return this.phone;
        }
    };

}
