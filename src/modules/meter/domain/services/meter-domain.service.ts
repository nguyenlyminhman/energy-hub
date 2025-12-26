import { Injectable } from "@nestjs/common";
import { ReadingValue } from "../value-objects/reading-value.vo";
import { Meter } from "../entities/meter";

@Injectable()
export class MeterDomainService {
  registerReading(
    meter: Meter,
    value: ReadingValue,
    createdBy: string,
  ) {
    return meter.registerReading(value, createdBy);
  }
}