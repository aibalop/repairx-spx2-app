import { IAddress } from "../../modules/customers/interfaces/address.interface";

export class FormatUtil {
    constructor() {
    }

    static getFormattedPhone(phone: string): string {
        return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.slice(6, 8)}-${phone.substring(8, 10)}`;
    }

    static getFormattedAddress(address: IAddress): string {
        return `${address.street} #${address.num}${address.interiorNum ? ' Int. #' + address.interiorNum : ''} Col. ${address.colony} CP. ${address.zip}`;
    }

}
