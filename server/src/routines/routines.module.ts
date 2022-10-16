import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutineController } from './routines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entitles/routine.entity';
import { RoutinesRepository } from './routines.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Routine])],
  controllers: [RoutineController],
  providers: [RoutinesService, RoutinesRepository],
})
export class RoutineModule {}
