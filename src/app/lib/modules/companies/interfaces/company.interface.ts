import {IAddress} from '../../customers/interfaces/address.interface';

export interface ICompany {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: IAddress;
}
