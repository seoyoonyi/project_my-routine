import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(createUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.repo.save(user);
    return this.repo.save(rest);
  }

  async findAll() {
    return this.repo.find();
  }

  async findBy(id: number) {
    return this.repo.find({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.repo.update(id, updateUserDto);
  }

  // sqlite에서 삭제된 데이터의 시퀀스가 남아있어 AUTO_INCREMENT 사용시 인덱스가 초기화가 안되는 문제 해결
  resetSequence = async () => {
    const reponse = await this.findAll();
    if (reponse?.length === 0) {
      await this.repo.query("UPDATE SQLITE_SEQUENCE SET seq = 0");
    }
  };

  async delete(id: number) {
    const excute = this.repo.delete(id);

    excute.then(() => {
      this.resetSequence();
    });

    return excute;
  }
}
