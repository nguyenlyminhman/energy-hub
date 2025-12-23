import { Injectable } from "@nestjs/common";
import { IMeterRepository } from "../repositories/meter.repository";
import { ReadingValue } from "../value-objects/reading-value.vo";
import { MeterRecord } from "../entities/meter-record";

@Injectable()
export class MeterDomainService {
  constructor(private readonly meterRepo: IMeterRepository) {}

  // register a new reading: check monotonic, de-dup, etc.
  async registerReading(meterId: number, rawValue: number, createdBy: string) {
    const rv = new ReadingValue(rawValue); // validation
    const last = await this.meterRepo.findLastRecordForMeter(meterId);
    if (last && rv.value < last.recordedValue) {
      throw new Error('New reading is less than last reading');
    }
    const record = new MeterRecord(null, meterId, rv.value, new Date(), createdBy);
    console.log(record);
    
    return await this.meterRepo.saveRecord(record);
  }
}