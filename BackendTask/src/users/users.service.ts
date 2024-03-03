import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./entities/user.entity";
import { InvitationsService } from "src/invitations/invitations.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private inviteService: InvitationsService
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.username,
        password: loginUserDto.password,
      },
    });
    return { user, access: user.id, refresh: user.id };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // check if invited
      const invited = await this.inviteService.validateInvite(
        createUserDto.email
      );

      if (!invited) {
        throw new ConflictException(
          "Invitation has been expired or not exist!"
        );
      }

      const emailCheck = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (emailCheck) {
        throw new ConflictException("User already exist");
      }
      const created = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        user_role: "user",
      });
      await this.userRepository.save(created);
      return created;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: username,
      },
    });
    return user;
  }

  async seedAdmin() {
    return this.userRepository.insert({
      name: "Admin User",
      password: "admin123",
      email: "admin@gmail.com",
      user_role: "admin",
    });
  }
}
