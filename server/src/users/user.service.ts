import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async findUserByWithoutPassword(userId: number): Promise<User | null> {
    const user = await this.repo.preload({ id: userId });
    return user;
  }

  async create(body: CreateUserDto): Promise<Omit<User, "password" | "id">> {
    const { email, name, password, haskeepLogin } = body;
    const findUserExist = await this.repo.findOne({ where: { email } });

    if (findUserExist) {
      throw new ConflictException("이미 존재하는 이메일 입니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.repo.save({
      email,
      name,
      password: hashedPassword,
      haskeepLogin,
    });

    const readonlyUserDto = {
      name: user.name,
      email: user.email,
      haskeepLogin: user.haskeepLogin,
    };
    return readonlyUserDto;
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
