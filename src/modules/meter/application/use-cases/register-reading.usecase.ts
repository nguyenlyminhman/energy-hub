import { Injectable } from "@nestjs/common";
import { IMeterRepository } from "../../domain/repositories/meter.repository";
import { MeterRecordResponse } from "../dtos/responses/meter-record.response";
import { UUID } from "crypto";

@Injectable()
export class RegisterReadingUseCase {
  constructor(
    private readonly meterRepo: IMeterRepository,
    // private readonly domainSvc: MeterDomainService,
  ) { }

  async execute(input: { meterId: string; oldValue: number; newValue: number; createdBy: string; }) {
    const meter = await this.meterRepo.findById(input.meterId);
    if (!meter) {
      throw new Error('Meter not found');
    }

    const lastRecord = await this.meterRepo.getLatestRecord(input.meterId);
    
    const record = meter.registerReading(
      lastRecord,
      input.newValue,
      input.oldValue,
      input.createdBy,
    );
    
    await this.meterRepo.saveMeterRecord(record);
    
    return MeterRecordResponse.from(record);
  }
}
