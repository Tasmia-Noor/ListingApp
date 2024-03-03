import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getEnvPath } from "./common/helper/env.helper";
import { TypeOrmConfigService } from "./shared/typeorm/typeorm.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { InvitationsModule } from "./invitations/invitations.module";
import { TasksModule } from "./tasks/tasks.module";
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    MailerModule.forRoot({
      transport: "smtps://user@domain.com:pass@smtp.domain.com",
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UsersModule,
    InvitationsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
