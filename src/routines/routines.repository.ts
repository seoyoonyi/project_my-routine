import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entitles/routine.entity';

@Injectable()
export class RoutinesRepository {
  constructor(
    @InjectRepository(Routine) private readonly repo: Repository<Routine>,
  ) {}

  async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
    const routine = this.repo.create(createRoutineDto);
    return this.repo.save(routine);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOneBy(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return this.repo.update(id, updateRoutineDto);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
