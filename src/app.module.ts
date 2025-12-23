import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ServerConfigService } from './modules/shared/server-config.service';
import { join } from 'path';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { MockModule } from './modules/mock/mock.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeterModule } from './modules/meter/meter.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // load: [() => ({
      //   defaultLang: 'vi',
      // })],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ServerConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        loaderOptions: {
          path: configService.isDevelopment ? join(process.cwd(), 'src/i18n') : join(__dirname, '/i18n'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      inject: [ServerConfigService],
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    SharedModule,
    PrismaModule,
    MockModule,
    UsersModule,
    AuthModule,
    MeterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule { }
