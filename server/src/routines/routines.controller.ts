import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('routines')
@UseInterceptors(SuccessInterceptor)
export class RoutineController {
  constructor(private readonly routineService: RoutinesService) {}

  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routineService.create(createRoutineDto);
  }

  @Get()
  findAll() {
    return this.routineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routineService.findOneBy(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routineService.update(+id, updateRoutineDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.routineService.delete(+id);
  }
}
