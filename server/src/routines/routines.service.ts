import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { CreateRoutineDto } from "./dto/create-routine.dto";
import { UpdateRoutineDto } from "./dto/update-routine.dto";
import { ActiveStatus, Routine } from "./entitles/routine.entity";

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine) private readonly repo: Repository<Routine>
  ) {}

  async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
    return this.repo.save(createRoutineDto);
  }

  async findAll() {
    return this.repo.find();
  }

  async findByActive(value: string) {
    if (value in ActiveStatus) {
      return this.repo.find({
        where: { activeStatus: value as ActiveStatus },
      });
    }
    throw new HttpException("조회 조건이 적합하지 않습니다.", 400);
  }

  async findBetweenDate(from: string, to: string) {
    return this.repo.find({ where: { date: Between(from, to) } });
  }

  async findByDate(value: string) {
    return this.repo.find({ where: { date: value } });
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

  async deleteAll() {
    let excute;
    try {
      excute = this.repo.delete({});
    } catch (error) {
      throw new HttpException("삭제할 대상이 존재하지 않습니다.", 400);
    }

    excute.then(() => {
      this.resetSequence();
    });

    return excute;
  }
}
