import {IUser} from '../../modules/users/interfaces/user.interface';
import {ICustomer} from '../../modules/customers/interfaces/customer.interface';
import {IWork} from '../../modules/catalogs/works/interfaces/work.interface';
import {ICharge} from '../../modules/catalogs/charges/interfaces/charge.interface';
import {ICompany} from '../../modules/companies/interfaces/company.interface';

type UserOrId = IUser & string;
type CustomerOrId = ICustomer & string;
type WorkOrId = IWork & string;
type ChargeOrId = ICharge & string;
type CompanyOrId = ICompany & string;

export {
  UserOrId,
  CustomerOrId,
  WorkOrId,
  ChargeOrId,
  CompanyOrId,
};
