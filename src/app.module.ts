import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from './common/pagination/pagination.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { MetaOption } from './meta-options/meta-option.entity.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

import databaseConfig from './config/database.config.js';
import appConfig from './config/app.config.js';
import envoirnmentValidation from './config/envoirnment.validation.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const ENV=process.env.NODE_ENV;

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:ENV ? `.env.${ENV}` : '.env',
      load:[appConfig,databaseConfig],
      validationSchema:envoirnmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' ,
        autoLoadEntities: configService.get('database.autoload'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        synchronize: configService.get('database.synchronize'),
      }),
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    PaginationModule,
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
