import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReadingDto {
  @IsInt()
  meterId: number;

  @IsInt()
  recordedValue: number;

  createdBy?: string;
}
