import { ConflictException, Injectable } from "@nestjs/common";
import { ICustomerRepository } from "../../domain/repositories/customer.repository";
import { CustomerEntity } from "../../domain/entities/customer.entity";
import { CreateCustomerResponse } from "../dtos/reponses/create-customer.response";

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepo: ICustomerRepository
  ) { }

  async execute(cmd: { customerCode: string, description: string | null, createdBy: string }) {
    const customer = CustomerEntity.create(cmd.customerCode, cmd.description, cmd.createdBy);
    
    const exist = await this.customerRepo.findByCode(customer.customerCode);
    if (exist) {
      throw new ConflictException("Customer code is exist")
    }
  
    await this.customerRepo.save(customer);

    return CreateCustomerResponse.from(customer);
  }
}
