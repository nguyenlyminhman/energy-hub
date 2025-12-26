import { Body, Controller, HttpCode, HttpStatus, Post, Request, Version } from '@nestjs/common';
import { MockService } from './mock.service';
import { ResponseApi } from './../../common/response.helper';
import { User } from 'src/decorator/user.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';

import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { MockDto } from './dto/mock.dto';
import MetadataDto from 'src/common/dto/metadata.dto';
import { ResponseDto } from 'src/common/payload.data';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';
import { Public } from 'src/decorator/public.decorator';

@Controller({ path: EApiPath.MOCK, version: VERSION_1 })
export class MockController {

    constructor(private readonly mockService: MockService) { }

    @Public()
    @Post("/timeout")
    @HttpCode(HttpStatus.ACCEPTED)
    async callTimeoutData(@User() user: any, @Body() body: any) {
        const data: ResponseDto = await this.mockService.callTimeoutData();
        return ResponseApi.success(data, "yo", HttpStatus.ACCEPTED);
    }

    @Public()
    @Post("/i8n")
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiQuery({
        name: 'lang',
        required: false,
        description: 'Ngôn ngữ hiển thị (query param)',
        example: 'vi',
    })
    async callI18N(@I18n() i18n: I18nContext, @Body() body: MockDto) {
        const data = body.input;
        const metaData = new MetadataDto({}, 1);
        const rs = new ResponseDto();
        rs.data = data;
        rs.metadata = metaData;
        return ResponseApi.success(rs, i18n.t('root.create_success'), HttpStatus.ACCEPTED);
    }

}
