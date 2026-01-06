import { Injectable } from "@nestjs/common";
import { IMeterRepository } from "../domain/repositories/meter.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Meter } from "../domain/entities/meter";
import { MeterRecord } from "../domain/entities/meter-record";
import PaginationDto from "src/common/dto/pagination.dto";
import { AppUtil } from "src/utils/app.util";

@Injectable()
export class MeterPrismaRepository implements IMeterRepository {
  constructor(private readonly prisma: PrismaService) { }

  async saveMeterRecord(meterRecord: MeterRecord): Promise<void> {
    await this.prisma.meter_record.create({
      data: {
        id: meterRecord.id,
        meter_id: meterRecord.meterId,
        old_value: meterRecord.oldValue,
        new_value: meterRecord.newValue,
        created_at: meterRecord.createdAt,
        created_by: meterRecord.createdBy,
      },
    });
  }

  async getLatestRecord(meterId: string): Promise<MeterRecord | null> {
    const rs: any = await this.prisma.meter_record.findFirst({
      where: { meter_id: meterId },
      orderBy: { created_at: 'desc' },
    });

    return rs ? MeterRecord.fromPersistence(rs) : null;
  }

  async findAll(pagination: PaginationDto): Promise<Object | null> {
    const skipTake = AppUtil.getSkipTake(pagination);

    const totalMeter = await this.prisma.meter.count();
    const rs: any[] = await this.prisma.meter.findMany({ ...skipTake });

    return { data: rs, total: totalMeter }
  }

  async findByCode(meterCode: string): Promise<Meter | null> {
    const rs: any = await this.prisma.meter.findFirst({ where: { meter_code: meterCode } })
    return rs;
  }

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

  async loadRecords(meterId: string): Promise<MeterRecord[]> {
    const rows = await this.prisma.meter_record.findMany({
      where: { meter_id: meterId },
      orderBy: { created_at: 'asc' },
    });

    return rows.map(
      (r: any) =>
        MeterRecord.fromPersistence({
          id: r.id,
          meter_id: r.meter_id,
          old_value: r.old_value,
          new_value: r.new_value,
          created_at: r.created_at,
          created_by: r.created_by,
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
