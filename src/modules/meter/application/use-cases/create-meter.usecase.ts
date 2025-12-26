import { ConflictException, Injectable } from "@nestjs/common";
import { IMeterRepository } from "../../domain/repositories/meter.repository";
import { Meter } from "../../domain/entities/meter";
import { CreateMeterResponse } from "../dtos/responses/create-meter.response";

@Injectable()
export class CreateMeterUseCase {
  constructor(
    private readonly meterRepo: IMeterRepository
  ) { }

  async execute(cmd: { meterCode: string, description: string, createdBy: string }) {
    const meter = Meter.create(cmd.meterCode, cmd.description);
    
    const exist = await this.meterRepo.findByCode(meter.meterCode);
    if (exist) {
      throw new ConflictException("Meter code is exist")
    }
  
    await this.meterRepo.save(meter);

    return CreateMeterResponse.from(meter);
  }
}
