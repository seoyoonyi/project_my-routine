import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRoutineDto } from './dto/create-routine.dto'
import { UpdateRoutineDto } from './dto/update-routine.dto'
import { Routine } from './entitles/routine.entity'

@Injectable()
export class RoutinesService {
  constructor(@InjectRepository(Routine) private readonly repo: Repository<Routine>) {}

  async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
    const routine = this.repo.create(createRoutineDto)
    return this.repo.save(routine)
  }

  async findAll() {
    return this.repo.find()
  }

  async findOneBy(id: number) {
    return this.repo.findOneBy({ id })
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return this.repo.update(id, updateRoutineDto)
  }

  // sqlite에서 삭제된 데이터의 시퀀스가 남아있어 AUTO_INCREMENT 사용시 인덱스가 초기화가 안되는 문제 해결
  resetSequence = async () => {
    const reponse = await this.findAll()
    if (reponse?.length === 0) {
      await this.repo.query('UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "product"')
    }
  }

  async delete(id: number) {
    const excute = this.repo.delete(id)

    excute.then(() => {
      this.resetSequence()
    })

    return excute
  }
}
