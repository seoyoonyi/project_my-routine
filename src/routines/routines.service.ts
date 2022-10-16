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

  async findOneBy(id: number) {
    return this.repo.findOneBy(id);
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return this.repo.update(id, updateRoutineDto);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
