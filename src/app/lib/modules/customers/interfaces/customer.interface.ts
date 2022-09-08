import { IUser } from "../../users/interfaces/user.interface";
import { IAddress } from "./address.interface";

export interface ICustomer {
    _id?: string;
    name: string;
    lastName: string;
    surName?: string;
    slug: string;
    phone: string;
    email?: string;
    address?: IAddress;
    deleted?: boolean;
    createdBy?: string | IUser;
    updatedBy?: string | IUser;
    deletedBy?: string | IUser;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string;

    getFullName: () => string;
}
