import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import BaseDto from 'src/dto/base.dto';

export class MockDto extends BaseDto {
  @ApiProperty()
  @IsString()
  input: string;
}