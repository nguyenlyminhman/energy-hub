import { Inject, Injectable } from "@nestjs/common";
import { IMeterRepository } from "../../domain/repositories/meter.repository";
import { AllMeterResponse } from "../dtos/responses/all-meter.response";
import PaginationDto from "src/common/dto/pagination.dto";

@Injectable()
export class GetAllMeterUseCase {
  constructor(
    @Inject('IMeterRepository')
    private readonly meterRepo: IMeterRepository
  ) { }

  async execute(pagination: PaginationDto) {
    const meters: any = await this.meterRepo.findAll({...pagination});  

    return meters;
  }
}