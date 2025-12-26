import { Module } from '@nestjs/common';
import { PricingController } from './presentation/pricing.controller';
import { PricingService } from './domain/services/pricing.service';

@Module({
  controllers: [PricingController],
  providers: [PricingService]
})
export class PricingModule {}
