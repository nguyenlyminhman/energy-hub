import { Meter } from '../entities/meter';
import { MeterRecord } from '../entities/meter-record';

export interface IMeterRepository {
  findById(id: number): Promise<Meter | null>;
  findByCode(code: string): Promise<Meter | null>;
  save(meter: Meter): Promise<Meter>;
  saveRecord(record: MeterRecord): Promise<MeterRecord>;
  findLastRecordForMeter(meterId: number): Promise<MeterRecord | null>;
}
