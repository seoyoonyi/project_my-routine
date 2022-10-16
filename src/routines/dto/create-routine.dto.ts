import { IsString, IsDateString } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  date: Date;
}
