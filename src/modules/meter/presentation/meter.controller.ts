import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateMeterRecordUseCase } from '../application/use-cases/create-meter-record.usecase';
import { CreateReadingDto } from '../application/dtos/commands/create-reading.dto';
import { CreateMeterDto } from '../application/dtos/commands/create-meter.dto';
import { CreateMeterUseCase } from '../application/use-cases/create-meter.usecase';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';
import { User } from 'src/decorator/user.decorator';
import { CreateMeterResponse } from '../application/dtos/responses/create-meter.response';
import { ResponseApi } from 'src/common/response.helper';
import { ApiQuery } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { GetAllMeterUseCase } from '../application/use-cases/get-all-meter.usecase';
import PaginationDto from 'src/common/dto/pagination.dto';

@Controller({ path: EApiPath.METER, version: VERSION_1 })
export class MeterController {
  constructor(
    private readonly createMeterRecord: CreateMeterRecordUseCase,
    private readonly createMeter: CreateMeterUseCase,
    private readonly getAllMeter: GetAllMeterUseCase,
    // implement
  ) { }

  @ApiQuery({
    name: 'lang',
    required: false,
    description: 'Ngôn ngữ hiển thị (query param)',
    example: 'vi',
  })
  @Get('/all')
  async viewAll(@I18n() i18n: I18nContext, @Query() pagination: PaginationDto) {
    const rs = await this.getAllMeter.execute({ ...pagination });

    return ResponseApi.success(rs, i18n.t('root.get_success'), HttpStatus.OK);
  }

  @ApiQuery({
    name: 'lang',
    required: false,
    description: 'Ngôn ngữ hiển thị (query param)',
    example: 'vi',
  })
  @Post('/register')
  async register(@I18n() i18n: I18nContext, @User() user: any, @Body() dto: CreateMeterDto) {
    const record: CreateMeterResponse = await this.createMeter.execute({
      meterCode: dto.meterCode,
      description: dto.description ?? "",
      createdBy: user?.id ?? 'SYSTEM',
    });

    return ResponseApi.success(record, i18n.t('root.create_success'), HttpStatus.ACCEPTED);
  }

  @ApiQuery({
    name: 'lang',
    required: false,
    description: 'Ngôn ngữ hiển thị (query param)',
    example: 'vi',
  })

  @Post('/reading')
  async reading(@I18n() i18n: I18nContext, @User() user: any, @Body() dto: CreateReadingDto) {
    const record = await this.createMeterRecord.execute({
      meterId: dto.meterId,
      oldValue: dto.oldValue,
      newValue: dto.newValue,
      createdBy: user?.id ?? 'SYSTEM',
    });

    return ResponseApi.success(record, i18n.t('root.create_success'), HttpStatus.ACCEPTED);
  }
}
