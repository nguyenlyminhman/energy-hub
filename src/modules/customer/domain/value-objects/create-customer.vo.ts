export class CreateCustomerVO {
  public readonly customerCode: string;

  constructor(customerCode: string) {
    if (customerCode  == '' || customerCode == undefined || customerCode == null) {
      throw new Error('Invalid customer code');
    }
    this.customerCode = customerCode.toUpperCase();
  }
}
