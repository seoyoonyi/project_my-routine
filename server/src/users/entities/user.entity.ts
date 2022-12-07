import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from "class-validator";

@Entity()
@Unique(["email"])
export class User {
  @ApiProperty({
    example: 1,
    description: "id",
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: "홍길동",
    description: "name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    example: "adcde@gmail.com",
    description: "email",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "password",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: false,
    description: "haskeepLogin",
    required: true,
  })
  @IsBoolean()
  @Column({ default: false })
  haskeepLogin: boolean;
}
