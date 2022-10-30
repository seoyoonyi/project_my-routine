import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoutineDto } from "./dto/create-routine.dto";
import { UpdateRoutineDto } from "./dto/update-routine.dto";
import { Routine } from "./entitles/routine.entity";

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine) private readonly repo: Repository<Routine>
  ) {}

  async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
    const routine = this.repo.create(createRoutineDto);
    return this.repo.save(routine);
  }

  async findAll() {
    return this.repo.find();
  }

  async findBy(date: string) {
    return this.repo.find({ where: { date: date } });
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    const isExist = await this.repo.preload({ id });
    let excute;

    if (isExist) {
      excute = this.repo.update(id, updateRoutineDto);
    } else {
      throw new HttpException("변경할 대상이 존재하지 않습니다.", 400);
    }
    return excute;
  }

  // sqlite에서 삭제된 데이터의 시퀀스가 남아있어 AUTO_INCREMENT 사용시 인덱스가 초기화가 안되는 문제 해결
  resetSequence = async () => {
    const reponse = await this.findAll();
    if (reponse?.length === 0) {
      await this.repo.query("UPDATE SQLITE_SEQUENCE SET seq = 0");
    }
  };

  async delete(id: number) {
    const isExist = await this.repo.preload({ id });
    let excute;

    if (isExist) {
      excute = this.repo.delete(id);
    } else {
      throw new HttpException("삭제할 대상이 존재하지 않습니다.", 400);
    }

    excute.then(() => {
      this.resetSequence();
    });

    return excute;
  }
}
