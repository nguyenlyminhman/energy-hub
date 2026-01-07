import { Injectable } from "@nestjs/common";
import { CustomerEntity } from "../domain/entities/customer.entity";
import { ICustomerRepository } from "../domain/repositories/customer.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import PaginationDto from "src/common/dto/pagination.dto";
import { AppUtil } from "src/utils/app.util";

@Injectable()
export class CustomerPrismaRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(pagination: PaginationDto): Promise<Object | null> {

    const skipTake = AppUtil.getSkipTake(pagination);

    const totalCustomer = await this.prisma.customer.count();
    const rs: any[] = await this.prisma.customer.findMany({ ...skipTake });

    return { data: rs, total: totalCustomer }
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    const rs = await this.prisma.customer.findUnique({ where: { id } })
    if (!rs) return null;

    return new CustomerEntity(rs.id, rs.customer_code, rs.description, rs.created_at, rs.created_by, rs.updated_at, rs.updated_by);
  }

  async findByCode(customerCode: string): Promise<CustomerEntity | null> {
    const rs = await this.prisma.customer.findUnique({ where: { customer_code: customerCode } })
    if (!rs) return null;

    return new CustomerEntity(rs.id, rs.customer_code, rs.description, rs.created_at, rs.created_by, rs.updated_at, rs.updated_by);
  }

  async save(customer: CustomerEntity): Promise<void> {
    await this.prisma.customer.create({
      data: {
        id: customer.id,
        customer_code: customer.customerCode,
        description: customer.description,
        created_at: customer.createdAt,
        created_by: customer.createdBy
      }
    })
  }
}
