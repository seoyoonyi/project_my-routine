import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsString,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export enum Status {
  DONE = 'DONE',
  DO = 'DO',
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
    description: 'status',
    required: true,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  @Column()
  status: Status;
}
