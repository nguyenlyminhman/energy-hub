import { Module } from '@nestjs/common';
import { MeterController } from './presentation/meter.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MeterPrismaRepository } from './infrastructure/meter.prisma.repository';
import { MeterDomainService } from './domain/services/meter-domain.service';
import { RegisterReadingUseCase } from './application/use-cases/register-reading.usecase';

@Module({
  controllers: [MeterController],
  providers: [
    PrismaService,
    { provide: 'IMeterRepository', useClass: MeterPrismaRepository },
    {
      provide: MeterDomainService,
      useFactory: (repo) => new MeterDomainService(repo),
      inject: ['IMeterRepository'],
    },
    {
      provide: RegisterReadingUseCase,
      useFactory: (domainSvc) => new RegisterReadingUseCase(domainSvc),
      inject: [MeterDomainService],
    },
  ],
  exports: [],
})
export class MeterModule {}
