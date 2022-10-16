import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutinesRepository } from './routines.repository';

@Injectable()
export class RoutinesService {
  constructor(private readonly repo: RoutinesRepository) {}

  async create(createRoutineDto: CreateRoutineDto) {
    return this.repo.create(createRoutineDto);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return this.repo.update(id, updateRoutineDto);
  }

  async remove(id: number) {
    return this.repo.remove(id);
  }
}
