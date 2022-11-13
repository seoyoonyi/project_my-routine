import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsString,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export enum ActiveStatus {
  DONE = 'DONE',
  DO = 'DO',
}

export enum TimeStatus {
  MORNING = '아침',
  PM = '오후',
  EVENING = '저녁',
}

@Entity()
export class Routine {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '운동가기',
    description: 'title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    example: '매일매일 가벼운 운동으로 건강 챙기기',
    description: 'content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ApiProperty({
    example: '2022-10-22',
    description: 'date',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  @Column()
  date: string;

  @ApiProperty({
    example: 'DO',
    description: 'activeStatus',
    required: true,
  })
  @IsEnum(ActiveStatus)
  @IsNotEmpty()
  @Column()
  activeStatus: ActiveStatus;

  @ApiProperty({
    example: '아침',
    description: 'timeStatus',
    required: true,
  })
  @IsEnum(TimeStatus)
  @IsNotEmpty()
  @Column()
  timeStatus: TimeStatus;
}
