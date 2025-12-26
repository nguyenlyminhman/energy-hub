import { ConflictException, Injectable } from "@nestjs/common";
import { IMeterRepository } from "../domain/repositories/meter.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Meter } from "../domain/entities/meter";
import { MeterRecord } from "../domain/entities/meter-record";

@Injectable()
export class MeterPrismaRepository implements IMeterRepository {
  constructor(private readonly prisma: PrismaService) { }


  async findByCode(meterCode: string): Promise<Meter | null> {
    const rs: any = await this.prisma.meter.findFirst({ where: { meter_code: meterCode } })
    return rs;
  }

  /* =========================
     LOAD AGGREGATE ROOT
     ========================= */
  async findById(id: string): Promise<Meter | null> {
    const r = await this.prisma.meter.findUnique({
      where: { id },
    });

    if (!r) return null;

    return new Meter(
      r.id,
      r.meter_code,
      r.description,
      null
    );
  }

  /* =========================
     LOAD CHILD ENTITIES
     ========================= */
  async loadRecords(meterId: string): Promise<MeterRecord[]> {
    const rows = await this.prisma.meter_record.findMany({
      where: { meter_id: meterId },
      orderBy: { created_at: 'asc' },
    });

    return rows.map(
      (r: any) =>
        MeterRecord.fromPersistence({
          id: r.id,
          oldValue: r.old_value,
          newValue: r.new_value,
          createdAt: r.created_at,
          createdBy: r.created_by,
        }),
    );
  }


  async save(meter: Meter): Promise<void> {
    await this.prisma.meter.create({
      data: {
        id: meter.id,
        meter_code: meter.meterCode,
        description: meter.description,
        created_at: new Date(),
        created_by: 'system',
      },
    });
  }
}
