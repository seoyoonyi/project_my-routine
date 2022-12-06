import { User } from "src/users/entities/user.entity";
import { OmitType } from "@nestjs/swagger";

export class UpdateUserDto extends OmitType(User, [
  "id",
  "password",
] as const) {}
