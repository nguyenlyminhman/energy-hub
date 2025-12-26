import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { RegisterReadingUseCase } from '../application/use-cases/register-reading.usecase';
import { CreateReadingDto } from '../application/dtos/commands/create-reading.dto';
import { CreateMeterDto } from '../application/dtos/commands/create-meter.dto';
import { CreateMeterUseCase } from '../application/use-cases/create-meter.usecase';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';
import { User } from 'src/decorator/user.decorator';
import { CreateMeterResponse } from '../application/dtos/responses/create-meter.response';
import { ResponseApi } from 'src/common/response.helper';
import { ApiQuery } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller({ path: EApiPath.METER, version: VERSION_1 })
export class MeterController {
  constructor(
    private readonly registerReading: RegisterReadingUseCase,
    private readonly createMeter: CreateMeterUseCase
  ) { }

  @Get('/code/:meterCode')
  async view(@Body() dto: CreateMeterDto) {
    return null;
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

  @Post('/readings')
  async reading(@Body() dto: CreateReadingDto) {
    const record = await this.registerReading.execute({
      meterId: dto.meterId,
      oldValue: dto.oldValue,
      newValue: dto.newValue,
      createdBy: 'system',
    });

    return { value: record.newValue, createdAt: record.createdAt };
  }
}
