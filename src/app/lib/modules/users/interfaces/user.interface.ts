export interface IUser {
    _id?: string;
    name: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;

    getFullName: () => string;
    getUsername: () => string;
}
