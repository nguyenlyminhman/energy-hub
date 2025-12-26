import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateReadingDto {
  
  @ApiProperty()
  @IsString()
  meterId: string;

  @ApiProperty()
  @IsInt()
  oldValue: number;

  @ApiProperty()
  @IsInt()
  newValue: number;
}
