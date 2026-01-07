import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateCustomerDto {  
  @ApiProperty()
  @IsString()
  customerCode: string;

  @ApiProperty()
  @IsString()
  description: string;
}