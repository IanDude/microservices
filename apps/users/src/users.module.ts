import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { User } from './database/entities/users.entity';
import { Roles } from './database/entities/roles.entity';
import { Permissions } from './database/entities/permissions.entity';
// import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...getTypeOrmConfig(configService),
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Roles, Permissions]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
