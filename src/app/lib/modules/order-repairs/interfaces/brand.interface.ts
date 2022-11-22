import { IUser } from "../../users/interfaces/user.interface";

export interface IBrand {
    _id?: string;
    name: string;
    slug?: string;
    deleted?: boolean;
    createdBy?: string | IUser;
    updatedBy?: string | IUser;
    deletedBy?: string | IUser;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string;
}
