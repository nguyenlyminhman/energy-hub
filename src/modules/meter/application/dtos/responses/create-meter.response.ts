import { Meter } from "src/modules/meter/domain/entities/meter";

export class CreateMeterResponse {
  constructor(
    public readonly id: string,
    public readonly meterCode: string,
    public readonly description: string,
    public readonly createdAt?: Date,
  ) {}

  static from(meter: Meter): CreateMeterResponse {
    return new CreateMeterResponse(
      meter.id,
      meter.meterCode,
      meter.description ?? ''
    );
  }
}
