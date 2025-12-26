import { Module } from '@nestjs/common';
import { MeterController } from './presentation/meter.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MeterPrismaRepository } from './infrastructure/meter.prisma.repository';
import { MeterDomainService } from './domain/services/meter-domain.service';
import { RegisterReadingUseCase } from './application/use-cases/register-reading.usecase';
import { CreateMeterUseCase } from './application/use-cases/create-meter.usecase';

@Module({
  controllers: [MeterController],
  providers: [
    PrismaService,
    { provide: 'IMeterRepository', useClass: MeterPrismaRepository },
    {
      provide: MeterDomainService,
      useClass: MeterDomainService,
    },
    {
      provide: RegisterReadingUseCase,
      useFactory: (repo, domainSvc) =>
        new RegisterReadingUseCase(repo, domainSvc),
      inject: ['IMeterRepository', MeterDomainService],
    },
    {
      provide: CreateMeterUseCase,
      useFactory: (repo) =>
        new CreateMeterUseCase(repo),
      inject: ['IMeterRepository', MeterDomainService],
    },
    
  ],
})
export class MeteringModule {}
