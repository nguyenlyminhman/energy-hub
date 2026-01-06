import { Inject, Injectable } from "@nestjs/common";
import { IMeterRepository } from "../../domain/repositories/meter.repository";
import PaginationDto from "src/common/dto/pagination.dto";
import { ResponseDto } from "src/common/payload.data";
import MetadataDto from "src/common/dto/metadata.dto";

@Injectable()
export class GetAllMeterUseCase {
  constructor(
    @Inject('IMeterRepository')
    private readonly meterRepo: IMeterRepository
  ) { }

  async execute(pagination: PaginationDto) {
    const rs: any = await this.meterRepo.findAll({...pagination});
    
    const meta = new MetadataDto(pagination, rs?.total);

    return new ResponseDto(rs.data, meta);
  }
}