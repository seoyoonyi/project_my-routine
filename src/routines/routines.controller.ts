import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoutinesService } from "./routines.service";
import { CreateRoutineDto } from "./dto/create-routine.dto";
import { UpdateRoutineDto } from "./dto/update-routine.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReadOnlyRoutineDto } from "./dto/routine.dto";

@Controller("routines")
export class RoutineController {
  constructor(private readonly routineService: RoutinesService) {}

  @ApiOperation({ summary: "루틴 등록" })
  @ApiResponse({
    status: 500,
    description: "Server Error...",
  })
  @ApiResponse({
    status: 201,
    description: "성공!",
    type: ReadOnlyRoutineDto,
  })
  @Post()
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routineService.create(createRoutineDto);
  }

  @ApiOperation({ summary: "전체 루틴 조회" })
  @Get()
  async findAll() {
    return this.routineService.findAll();
  }

  @ApiOperation({ summary: "특정 날짜 루틴 조회" })
  @Get(":date")
  async findBy(@Param("date") date: string) {
    return this.routineService.findBy(date);
  }

  @ApiOperation({ summary: "루틴 변경" })
  @ApiResponse({
    status: 400,
    description: "변경할 대상이 존재하지 않습니다.",
  })
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateRoutineDto: UpdateRoutineDto
  ) {
    return this.routineService.update(+id, updateRoutineDto);
  }

  @ApiOperation({ summary: "루틴 삭제" })
  @ApiResponse({
    status: 400,
    description: "삭제할 대상이 존재하지 않습니다.",
  })
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.routineService.delete(+id);
  }
}
