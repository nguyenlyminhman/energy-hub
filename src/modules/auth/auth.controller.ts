import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { UserLoginDto } from './dto/login.dto';
import { ResponseApi } from 'src/common/response.helper';
import { ResponseDto } from 'src/common/payload.data';
import { Public } from 'src/decorator/public.decorator';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';

@ApiTags('Authentication')
@Controller({ path: EApiPath.AUTH, version: VERSION_1 })
export class AuthController {
  constructor(
    readonly authService: AuthService,
  ) { }


  @Public()
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({ description: 'Create a new user' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi', })
  async creatUser(@I18n() i18n: I18nContext, @Body() userLoginDto: UserLoginDto): Promise<ResponseApi> {
    try {
      const rs: ResponseDto = await this.authService.login(userLoginDto);
      return ResponseApi.success(rs,  i18n.t('root.login_success'), HttpStatus.ACCEPTED);
    } catch (error) {
      return ResponseApi.error("", i18n.t('root.login_fail'));
    }
  }
}
