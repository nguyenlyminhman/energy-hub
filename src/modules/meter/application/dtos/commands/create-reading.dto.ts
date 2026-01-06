import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateReadingDto {
  
  @ApiProperty()
  @IsUUID()
  meterId: string;

  @ApiProperty()
  @IsInt()
  oldValue: number;

  @ApiProperty()
  @IsInt()
  newValue: number;
}
