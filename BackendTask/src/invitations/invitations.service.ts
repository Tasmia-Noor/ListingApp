import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateInvitationDto } from "./dto/create-invitation.dto";
import { Invitation } from "./entities/invitation.entity";

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private inviteRepository: Repository<Invitation>
  ) {}

  async create(createInvitationDto: CreateInvitationDto) {
    try {
      let currentDate = new Date();
      let hoursToAdd = 3;
      currentDate.setHours(currentDate.getHours() + hoursToAdd);

      // in case of resend invite
      let invite = await this.inviteRepository.findOne({
        where: { user_email: createInvitationDto.user_email },
      });

      if (invite) {
        invite = await this.inviteRepository.save({
          ...invite,
          ...{ expired_at: currentDate },
        });
      } else {
        invite = this.inviteRepository.create({
          user_email: createInvitationDto.user_email,
          expired_at: currentDate,
        });
        await this.inviteRepository.save(invite);
      }

      return invite;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    return await this.inviteRepository.find();
  }

  async validateInvite(email: string) {
    try {
      const invite = await this.inviteRepository.findOne({
        where: { user_email: email },
      });
      if (!invite) {
        return false;
      }

      const inviteDate = new Date(invite.expired_at);

      const currentDate = new Date();

      return inviteDate.getHours() >= currentDate.getHours();
    } catch (error) {
      return false;
    }
  }
}
