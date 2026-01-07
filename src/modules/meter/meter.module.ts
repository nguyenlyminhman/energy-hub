import { Module } from '@nestjs/common';
import { MeterController } from './presentation/meter.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MeterPrismaRepository } from './infrastructure/meter.prisma.repository';
import { MeterDomainService } from './domain/services/meter-domain.service';
import { CreateMeterUseCase } from './application/use-cases/create-meter.usecase';
import { GetAllMeterUseCase } from './application/use-cases/get-all-meter.usecase';
import { CreateMeterRecordUseCase } from './application/use-cases/create-meter-record.usecase';

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
      provide: CreateMeterRecordUseCase,
      useFactory: (repo) => new CreateMeterRecordUseCase(repo),
      inject: ['IMeterRepository', MeterDomainService],
    },
    {
      provide: CreateMeterUseCase,
      useFactory: (repo) => new CreateMeterUseCase(repo),
      inject: ['IMeterRepository', MeterDomainService],
    },
    {
      provide: GetAllMeterUseCase,
      useFactory: (repo) => new GetAllMeterUseCase(repo),
      inject: ['IMeterRepository'],
    },
  ],
})
export class MeteringModule {}
