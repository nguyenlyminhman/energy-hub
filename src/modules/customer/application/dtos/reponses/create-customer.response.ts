import { CustomerEntity } from "src/modules/customer/domain/entities/customer.entity";

export class CreateCustomerResponse {
  constructor(
    public readonly id: string,
    public readonly customerCode: string,
    public readonly description: string,
    public readonly createdAt: Date | null,
    public readonly createdBy: string | null,

  ) {}

  static from(customer: CustomerEntity): CreateCustomerResponse {
    return new CreateCustomerResponse(
      customer.id,
      customer.customerCode,
      customer.description ?? '',
      customer.createdAt,
      customer.createdBy
    );
  }
}
