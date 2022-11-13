import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @ApiOperation({ summary: "활성화 여부를 조건으로 루틴 조회" })
  @Get("active/:value")
  async findByActive(@Param("value") value: string) {
    return this.routineService.findByActive(value);
  }

  @ApiOperation({ summary: "특정 기간의 루틴 조회" })
  @Get("date")
  async findBetweenDate(@Query("from") from: string, @Query("to") to: string) {
    return this.routineService.findBetweenDate(from, to);
  }

  @ApiOperation({ summary: "특정 기간의 루틴 조회" })
  @Get("date/:value")
  async findByDate(@Param("value") value: string) {
    return this.routineService.findByDate(value);
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

  @ApiOperation({ summary: "특정 루틴 삭제" })
  @ApiResponse({
    status: 400,
    description: "삭제할 대상이 존재하지 않습니다.",
  })
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.routineService.delete(+id);
  }

  @ApiOperation({ summary: "모든 루틴 삭제 - 관리용" })
  @ApiResponse({
    status: 400,
    description: "삭제할 대상이 존재하지 않습니다.",
  })
  @Delete()
  async deleteAll() {
    return this.routineService.deleteAll();
  }
}
