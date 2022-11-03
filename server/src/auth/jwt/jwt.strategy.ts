import { UserService } from "./../../users/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userService.findUserByWithoutPassword(payload.sub);

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException("권한이 없습니다.");
    }
  }
}
