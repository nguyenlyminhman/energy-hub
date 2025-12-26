import { MeterRecord } from './meter-record';
import { ReadingValue } from '../value-objects/reading-value.vo';

export class Meter {
  private records: MeterRecord[] = [];

  constructor(
    public readonly id: string,        // UUID
    public readonly meterCode: string,
    public description: string | null,
    public pricePlanId: string | null, // nếu business cần
  ) {}

  static create(code: string, description: string): Meter {
    const normalizedCode = code.trim().toUpperCase();

    return new Meter(
      crypto.randomUUID(),
      normalizedCode,
      description,
      null
    );
  }

  /* ========== Aggregate Behavior ========== */

  registerReading(reading: ReadingValue, createdBy: string): MeterRecord {
    const last = this.getLastRecord();

    if (last && reading.newValue < last.newValue) {
      throw new Error('New reading is less than last reading');
    }

    const record = MeterRecord.create({
      oldValue: reading.oldValue,
      newValue: reading.newValue,
      createdBy,
    });

    this.records.push(record);
    return record;
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
