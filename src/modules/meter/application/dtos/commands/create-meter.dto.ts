import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMeterDto {  
  @ApiProperty()
  @IsString()
  meterCode: string;

  @ApiProperty()
  @IsString()
  description?: string;
}
