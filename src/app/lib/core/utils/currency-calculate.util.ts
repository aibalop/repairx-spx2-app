import * as currency from 'currency.js';
export class CurrencyCalculateUtil  {
  constructor() {}
  static calculateSummation(values: Array<number>): number {
    let summation = 0;
    for (const value of values) {
      summation = currency(summation).add(value).value;
    }
    return summation;
  }
  static calculateSubtraction(minuend: number, subtrahend: number): number {
    return currency(minuend).subtract(subtrahend).value;
  }
}
