import {
  IChargeOrderRepair,
  ICustomerOrderRepair, IDeviceOrderRepair,
  IOrderRepair,
  IWorkOrderRepair
} from '../interfaces/order-repair.interface';
import {UserOrId} from '../../../core/utils/app-types.util';
import {Customer} from '../../customers/models/customer.model';

export class OrderRepair implements IOrderRepair {
  _id: string;
  orderId: string;
  customer: ICustomerOrderRepair;
  works: Array<IWorkOrderRepair>;
  devices: Array<IDeviceOrderRepair>;
  charges: Array<IChargeOrderRepair>;
  status: string;
  isPaid: boolean;
  paidAt: string;
  deliveryDate: string;
  discountAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  subtotalAmount: number;
  totalAmount: number;
  updatedAt?: string;
  updatedBy?: UserOrId;
  deleted?: boolean;
  deletedAt?: string;
  deletedBy?: UserOrId;
  createdAt?: string;
  createdBy?: UserOrId;
  private _customer: Customer;

  constructor(data: IOrderRepair) {
    Object.assign(this, data);
    this._customer = new Customer({
      _id: data.customer.customerId,
      name: data.customer.name,
      lastName: data.customer.lastName,
      surName: data.customer.surName,
      phone: data.customer.phone,
      email: data.customer.email,
    });
  }

  getCustomerPhone(): string {
    return this._customer.getPhoneFormat();
  }

  getCustomerFullName(): string {
    return this._customer.getFullName();
  }

  getOrderIdFormat(): string {
    return `#${this.orderId}`;
  }

}
