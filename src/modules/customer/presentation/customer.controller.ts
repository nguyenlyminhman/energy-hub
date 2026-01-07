import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';
import { CreateCustomerUseCase } from '../application/use-cases/create-customer.usecase';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiQuery } from '@nestjs/swagger';
import { ResponseApi } from 'src/common/response.helper';
import { CreateCustomerDto } from '../application/dtos/commands/create-customer.dto';
import { User } from 'src/decorator/user.decorator';

@Controller({ path: EApiPath.CUSTOMER, version: VERSION_1 })
export class CustomerController {

  constructor(
    private readonly createCustomer: CreateCustomerUseCase
    // implement
  ) { }

  @ApiQuery({
    name: 'lang',
    required: false,
    description: 'Ngôn ngữ hiển thị (query param)',
    example: 'vi',
  })
  @Post('/create')
  async createCus(@I18n() i18n: I18nContext, @User() user: any, @Body() dto: CreateCustomerDto) {
    const rs = await this.createCustomer.execute({
      customerCode: dto.customerCode,
      description: dto.description,
      createdBy: user?.id ?? 'SYSTEM',
    });

    return ResponseApi.success(rs, i18n.t('root.create_success'), HttpStatus.CREATED);
  }
}
