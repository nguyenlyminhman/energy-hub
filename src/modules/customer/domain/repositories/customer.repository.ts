import PaginationDto from "src/common/dto/pagination.dto";
import { CustomerEntity } from "../entities/customer.entity";

export interface ICustomerRepository { 
    findById(id: string): Promise<CustomerEntity | null>;

    findByCode(meterCode: string): Promise<CustomerEntity | null>;

    findAll(pagination: PaginationDto): Promise<Object | null>;
    
    save(meter: CustomerEntity): Promise<void>;
    
}
