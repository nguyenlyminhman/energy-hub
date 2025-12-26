import { Injectable } from "@nestjs/common";
import { MeterDomainService } from "../../domain/services/meter-domain.service";
import { IMeterRepository } from "../../domain/repositories/meter.repository";
import { ReadingValue } from "../../domain/value-objects/reading-value.vo";

@Injectable()
export class RegisterReadingUseCase {
  constructor(
    private readonly meterRepo: IMeterRepository,
    private readonly domainSvc: MeterDomainService,
  ) {}

  async execute(input: { meterId: string; oldValue: number; newValue: number; createdBy: string;}) {
    const meter = await this.meterRepo.findById(input.meterId);
    if (!meter) {
      throw new Error('Meter not found');
    }

    // const records = await this.meterRepo.loadRecords(meter.id);
    // meter.loadRecords(records);

    const record = this.domainSvc.registerReading(
      meter,
      new ReadingValue(input.oldValue, input.newValue),
      input.createdBy,
    );

    await this.meterRepo.save(meter);

    return record;
  }
}
