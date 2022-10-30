import { ConflictException, HttpException, Injectable } from "@nestjs/common";
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

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = await this.repo.save(user);
      return this.repo.save(rest);
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException("이미 존재하는 이메일 입니다");
      } else {
        // eslint-disable-next-line no-console
        console.log("error", error);
      }
    }
    return null;
  }

  async findAll() {
    return this.repo.find();
  }

  async findBy(id: number) {
    return this.repo.find({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const isExist = await this.repo.preload({ id });
    let excute;

    if (isExist) {
      excute = this.repo.update(id, updateUserDto);
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
