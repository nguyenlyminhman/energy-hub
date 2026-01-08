import { BaseEntity } from "src/modules/shared/domain/entities/base-entity";
import { AppUtil } from "src/utils/app.util";

export class UsersEntity extends BaseEntity {
  constructor(
    public readonly id: string,
    public username: string,
    public password: string | null,
    public fullname: string | null,
    public avatar: string | null,
    createdAt: Date | null,
    createdBy: string | null,
    updatedAt: Date | null,
    updatedBy: string | null,
  ) {
    super(createdAt, createdBy, updatedAt, updatedBy);
  }

  static create(
    username: string,
    password: string,
    fullname: string | null,
    avatar: string | null,
    createdBy: string | null,
  ): UsersEntity {
    const now = new Date();
    //   const cusVo = new CreateUserVO();
    const hashedPassword = AppUtil.generatePassword(password);


    return new UsersEntity(
      crypto.randomUUID(),
      username,
      hashedPassword,
      fullname,
      avatar,
      now,
      createdBy,
      null,
      null,
    );
  }
}
