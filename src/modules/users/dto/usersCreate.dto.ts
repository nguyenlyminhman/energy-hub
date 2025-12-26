import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import BaseDto from "src/common/dto/base.dto";

export class UsersCreateDto {
  
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  avatar: string;

}