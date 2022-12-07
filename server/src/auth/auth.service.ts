import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password, haskeepLogin } = data;

    const user = await this.repo.findOne({
      where: { email },
      select: ['password', 'id', 'haskeepLogin'],
      // user.entity.ts에  password가 @Column({ select: false }) 되있어서 password가 반환이 안됨
      // select 옵션을 넣어줘야 password가 반환됨
    });

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated = await bcrypt.compare(password, user.password);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // 로그인 유지 체크값 변경
    await this.repo.update(user.id, {
      haskeepLogin: haskeepLogin,
    });

    const payload = { email: email, sub: user.id };

    return {
      haskeepLogin: haskeepLogin,
      token: this.jwtService.sign(payload),
    };
  }
}
