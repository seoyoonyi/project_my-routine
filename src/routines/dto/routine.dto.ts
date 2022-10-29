import { ApiProperty } from "@nestjs/swagger";

export class ReadOnlyRoutineDto {
  @ApiProperty({
    example: "1",
    description: "id",
  })
  id: string;

  @ApiProperty({
    example: "운동가기",
    description: "title",
  })
  title: string;

  @ApiProperty({
    example: "매일매일 가벼운 운동으로 건강 챙기기",
    description: "content",
  })
  content: string;

  @ApiProperty({
    example: "2022-10-22",
    description: "date",
  })
  date: string;
}
