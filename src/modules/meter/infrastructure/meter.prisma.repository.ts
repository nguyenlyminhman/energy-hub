import { Injectable } from "@nestjs/common";
import { IMeterRepository } from "../domain/repositories/meter.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Meter } from "../domain/entities/meter";
import { MeterRecord } from "../domain/entities/meter-record";

@Injectable()
export class MeterPrismaRepository implements IMeterRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Meter | null> {
    console.log(id);
    
    const r = await this.prisma.meter.findUnique({ where: { id }});
    if (!r) return null;
    return new Meter(r.id, r.meter_code, r.price_plan_id, r.created_at, r.created_by);
  }

  async findByCode(code: string): Promise<Meter | null> {
    const r = await this.prisma.meter.findFirst({ where: { meter_code: code }});
    if (!r) return null;
    return new Meter(r.id, r.meter_code, r.price_plan_id, r.created_at, r.created_by);
  }

  async save(meter: Meter): Promise<Meter> {
    const data = {
      meter_code: meter.meterCode,
      price_plan_id: meter.pricePlanId,
      created_by: meter.createdBy,
      created_at: meter.createdAt ?? new Date()
    };
    const r = await this.prisma.meter.create({ data });
    return new Meter(r.id, r.meter_code, r.price_plan_id, r.created_at, r.created_by);
  }

  async saveRecord(record: MeterRecord): Promise<MeterRecord> {
    const r = await this.prisma.meter_record.create({
      data: {
        meter_id: record.meterId,
        recorded_value: record.recordedValue,
        created_by: record.createdBy,
        created_at: record.createdAt ?? new Date(),
      }
    });    
    return new MeterRecord(r.id, r.meter_id!, r.recorded_value!, r.created_at, r.created_by);
  }

  async findLastRecordForMeter(meterId: number): Promise<MeterRecord | null> {
    const r = await this.prisma.meter_record.findFirst({
      where: { meter_id: meterId },
      orderBy: { created_at: 'desc' },
    });
    if (!r) return null;
    return new MeterRecord(r.id, r.meter_id!, r.recorded_value!, r.created_at, r.created_by);
  }
}