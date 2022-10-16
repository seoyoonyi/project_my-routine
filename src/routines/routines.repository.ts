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

  async findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return `This action updates a #${id} routine`;
  }

  async remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
