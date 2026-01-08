import { BaseEntity } from "src/modules/shared/domain/entities/base-entity";
import { CreateCustomerVO } from "../value-objects/create-customer.vo";

export class CustomerEntity extends BaseEntity {
  constructor(
    public readonly id: string,
    public customerCode: string,
    public description: string | null,
    createdAt: Date | null,
    createdBy: string | null,
    updatedAt: Date | null,
    updatedBy: string | null,
  ) {
    super(createdAt, createdBy, updatedAt, updatedBy);
  }

  static create(
    customerCode: string,
    description: string | null,
    createdBy: string | null,
  ): CustomerEntity {
    const now = new Date();

    const cusVo = new CreateCustomerVO(customerCode);
    
    return new CustomerEntity(
      crypto.randomUUID(),
      cusVo.customerCode,
      description,
      now,
      createdBy,
      null,
      null,
    );
  }

  updateValue(description: string, updatedBy: string) {
    if (description == null || description == undefined || description.trim() == '') {
      throw new Error('Description must be not null');
    }

    this.description = description
    this.update(updatedBy);
  }

}