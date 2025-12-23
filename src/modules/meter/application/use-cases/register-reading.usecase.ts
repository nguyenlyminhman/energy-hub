import { Injectable } from "@nestjs/common";
import { MeterDomainService } from "../../domain/services/meter-domain.service";

@Injectable()
export class RegisterReadingUseCase {
  constructor(private readonly meterDomainService: MeterDomainService) {}

  async execute(input: { meterId: number; value: number; createdBy: string }) {
    // Could add logging, authorization checks, events emission here
    const record = await this.meterDomainService.registerReading(input.meterId, input.value, input.createdBy);
    // optionally produce domain event: ReadingRegistered
    return record;
  }
}