import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}
  @UseGuards(AuthGuard)
  @Get("/profile")
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @Post("/seed")
  seedAdmin(@Body() test: string) {
    return this.usersService.seedAdmin();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
