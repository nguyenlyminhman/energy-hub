import { MeterRecord } from './meter-record';
import { ReadingValue } from '../value-objects/reading-value.vo';
import { CreateMeterVO } from '../value-objects/create-meter.vo';

export class Meter {
  private records: MeterRecord[] = [];

  constructor(
    public readonly id: string,
    public readonly customerId: string | null,        // UUID
    public readonly meterCode: string,
    public description: string | null,
    public pricePlanId: string | null, // nếu business cần
  ) {}

  static create(customerId: string, code: string, description: string): Meter {
    const meterVo = new CreateMeterVO(code);
    const normalizedCode = meterVo.meterCode.toUpperCase();

    return new Meter(
      crypto.randomUUID(),
      customerId,
      normalizedCode,
      description,
      null
    );
  }

  /* ========== Aggregate Behavior ========== */

   registerReading(
    lastRecord: MeterRecord | null,
    newValue: number,
    oldValue: number,
    createdBy: string,
  ): MeterRecord {
    const _oldValue = lastRecord?.oldValue ?? oldValue;
    const reading = new ReadingValue(_oldValue, newValue);

    return MeterRecord.create({
      meterId: this.id,
      oldValue: reading.oldValue,
      newValue: reading.newValue,
      createdBy,
    });
  }

  updateRecord(recordId: string, newValue: number): MeterRecord {
    const record = this.records.find(r => r.id === recordId);
    if (!record) {
      throw new Error('MeterRecord not found');
    }

    record.updateValue(newValue);
    return record;
  }

  /* ========== Persistence helpers ========== */

  loadRecords(records: MeterRecord[]) {
    this.records = records;
  }

  getRecords(): MeterRecord[] {
    return [...this.records];
  }

  getLastRecord(): MeterRecord | null {
    return this.records.at(-1) ?? null;
  }


}
