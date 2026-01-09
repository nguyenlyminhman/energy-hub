import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/repositories/user.repository";
import PaginationDto from "src/common/dto/pagination.dto";
import { UsersEntity } from "../domain/entities/users.entity";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UserPrismaRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<UsersEntity | null> {
    const rs = await this.prisma.users.findUnique({ where: { id } });
    if (!rs) return null;
    return new UsersEntity(rs.id, rs.username, null, rs.fullname, rs.avatar, rs.created_at, rs.created_by, null, null);
  }

  async findByUsername(username: string): Promise<UsersEntity | null> {
    const rs = await this.prisma.users.findFirst({ where: { username } });
    if (!rs) return null;
    return new UsersEntity(rs.id, rs.username, null, rs.fullname, rs.avatar, rs.created_at, rs.created_by, null, null);
  }

  findAll(pagination: PaginationDto): Promise<Object | null> {
    throw new Error("Method not implemented.");
  }

  async save(user: UsersEntity): Promise<void> {
    await this.prisma.users.create({ data: {
      id: user.id,
      username: user.username,
      password: user.password ?? '',
      fullname: user.fullname,
      avatar: user.avatar,
      created_at: user.createdAt,
      created_by: user.createdBy,
    }})
  }
}