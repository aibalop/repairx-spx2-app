import { IUser } from "../../../users/interfaces/user.interface";

export interface IWork {
    _id?: string;
    key: string;
    name: string;
    slug?: string;
    description?: string;
    amount: number;
    deleted?: boolean;
    createdBy?: string | IUser;
    updatedBy?: string | IUser;
    deletedBy?: string | IUser;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string;
}
