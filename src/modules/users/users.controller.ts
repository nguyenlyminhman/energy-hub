import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersCreateDto } from './dto/usersCreate.dto';
import { UsersService } from './users.service';
import { ResponseApi } from 'src/common/response.helper';
import { I18n, I18nContext } from 'nestjs-i18n';
import PaginationDto from 'src/common/dto/pagination.dto';
import { ResponseDto } from 'src/common/payload.data';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';

@ApiTags('Users')
@Controller({ path: EApiPath.USER, version: VERSION_1 })
export class UsersController {

  constructor(readonly usersService: UsersService) { }

  @Public()
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({ description: 'Create a new user' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi', })
  async creatUser(@I18n() i18n: I18nContext, @Body() usersCreateDto: UsersCreateDto): Promise<ResponseApi> {
    try {
      const data: ResponseDto = await this.usersService.create(usersCreateDto);

      return ResponseApi.success(data, i18n.t('root.create_success'), HttpStatus.ACCEPTED);

    } catch (error) {
      return ResponseApi.error("", i18n.t('root.create_fail'));
    }
  }

  @Get("/get-all")
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({ description: 'Find all users' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi' })
  async findAllUsers(@I18n() i18n: I18nContext, @User() user: any, @Query() pagination: PaginationDto): Promise<ResponseApi> {
    try {
      const data: ResponseDto = await this.usersService.findAll(pagination);
      return ResponseApi.success(data, i18n.t('root.get_success'), HttpStatus.OK);
    } catch (error) {
      return ResponseApi.error("", i18n.t('root.get_fail'));
    }
  }

}
