import {ICompany} from '../../companies/interfaces/company.interface';
import {CompanyOrId} from '../../../core/utils/app-types.util';

export interface IUser {
    _id?: string;
    name: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    companyId?: CompanyOrId;
    createdAt?: string;
    updatedAt?: string;

    getFullName: () => string;
    getUsername: () => string;
}

export interface IUserPayload {
  user: IUser;
  company: ICompany;
}
