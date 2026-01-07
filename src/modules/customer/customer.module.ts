import { Module } from '@nestjs/common';
import { CustomerController } from './presentation/customer.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerDomainService } from './domain/services/customer-domain.service';
import { CreateCustomerUseCase } from './application/use-cases/create-customer.usecase';
import { CustomerPrismaRepository } from './infrastructure/customer.prisma.repository';

@Module({
  controllers: [CustomerController],
  providers: [PrismaService,
    { provide: 'ICustomerRepository', useClass: CustomerPrismaRepository },
    { provide: CustomerDomainService, useClass: CustomerDomainService, },
    { 
      provide: CreateCustomerUseCase, 
      useFactory: (repo) => new CreateCustomerUseCase(repo), 
      inject: ['ICustomerRepository', CustomerDomainService],
    },
  ]
})
export class CustomerModule { }
