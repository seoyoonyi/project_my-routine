import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReadOnlyUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "회원가입" })
  @ApiResponse({
    status: 500,
    description: "Server Error...",
  })
  @ApiResponse({
    status: 409,
    description: "이미 존재하는 이메일 입니다.",
  })
  @ApiResponse({
    status: 201,
    description: "성공!",
    type: ReadOnlyUserDto,
  })
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "로그인" })
  @Post("login")
  async logIn() {
    return "login";
  }

  @ApiOperation({ summary: "로그아웃" })
  @Post("logout")
  async logOut() {
    return "logout";
  }

  @ApiOperation({ summary: "전체 회원 조회" })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "특정 회원 조회" })
  @Get(":id")
  async findBy(@Param("id") id: number) {
    return this.userService.findBy(+id);
  }

  @ApiOperation({ summary: "회원 정보 변경" })
  @ApiResponse({
    status: 400,
    description: "변경할 대상이 존재하지 않습니다.",
  })
  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "회원탈퇴" })
  @ApiResponse({
    status: 400,
    description: "삭제할 대상이 존재하지 않습니다.",
  })
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.userService.delete(+id);
  }
}
