import { ConflictException, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UsersEntity } from "../../domain/entities/users.entity";
import { CreateUserResponse } from "../dtos/response/create-user.reponse";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(cmd: { username: string, password: string, fullname: string, avatar: string, createdBy: string }) {
    const user = UsersEntity.create(cmd.username, cmd.password, cmd.fullname, cmd.avatar, cmd.createdBy);
    
    const exist = await this.userRepo.findByUsername(user.username);
    if (exist) {
      throw new ConflictException("Username is exist")
    }
  
    await this.userRepo.save(user);

    return CreateUserResponse.from(user);
  }
}