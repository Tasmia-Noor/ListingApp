import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signInDto: any) {
    return await this.usersService.create(signInDto);
  }
  async autoLogin(id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found");
    }

    const payload = { name: user.name, sub: user.id };
    delete user["password"];
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
      access: user.id,
      refresh: user.id,
    };
  }

  async signIn(username, pass) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const passwordComparison = await bcrypt.compare(pass, user.password);

    if (!passwordComparison) {
      throw new UnauthorizedException();
    }

    const payload = { name: user.name, sub: user.id };
    delete user["password"];
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
      access: user.id,
      refresh: user.id,
    };
  }

  async tokenGenerator(user) {
    return {
      access_token: await this.jwtService.signAsync({
        name: user.name,
        sub: user.id,
      }),
      user,
      access: user.id,
      refresh: user.id,
    };
  }

  async getUserByToken(token: string) {
    const decoded: any = await this.jwtService.decode(token);
    const user: any = await this.usersService.findOne(decoded.sub);
    return user;
  }
}
