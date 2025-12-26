import PaginationDto from 'src/common/dto/pagination.dto';
import { Meter } from '../entities/meter';
import { MeterRecord } from '../entities/meter-record';
import { ResponseDto } from 'src/common/payload.data';

export interface IMeterRepository {

  findById(id: string): Promise<Meter | null>;
  
  findByCode(meterCode: string): Promise<Meter | null>;
  
  findAll(pagination: PaginationDto): Promise<ResponseDto | null>;
  
  loadRecords(meterId: string): Promise<MeterRecord[]>;
  
  save(meter: Meter): Promise<void>;
}
