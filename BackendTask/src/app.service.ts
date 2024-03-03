import { Injectable } from "@nestjs/common";
//fff
@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
