import { Meter } from '../entities/meter';
import { MeterRecord } from '../entities/meter-record';

export interface IMeterRepository {
  findById(id: string): Promise<Meter | null>;
  findByCode(meterCode: string): Promise<Meter | null>;
  loadRecords(meterId: string): Promise<MeterRecord[]>;
  save(meter: Meter): Promise<void>;
}
