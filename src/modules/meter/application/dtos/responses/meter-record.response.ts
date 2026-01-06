import { MeterRecord } from "src/modules/meter/domain/entities/meter-record";

export class MeterRecordResponse {
  constructor(
    public readonly id: string,
    public readonly meterId: string,
    public readonly oldValue: number,
    public readonly newValue: number,
    public readonly createdAt?: Date,
    public readonly createdBy?: string,
  ) {}

  static from(record: MeterRecord): MeterRecordResponse {
    return new MeterRecordResponse(
      record.id,
      record.meterId,
      record.oldValue,
      record.newValue,
      record.createdAt,
      record.createdBy
    );
  }
}
