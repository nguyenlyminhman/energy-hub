import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { ServerConfigService } from '../shared/server-config.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';


@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ServerConfigService],
      useFactory: (configService: ServerConfigService) => ({
        secret: configService.authConfig.jwtSecret || 'your_jwt_secret_key',
        global: true,
        signOptions: { expiresIn: configService.authConfig.jwtExpirationTime || '8h' },
      }),

    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    ServerConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ]
})
export class AuthModule { }
