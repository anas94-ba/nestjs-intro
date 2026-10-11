import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller.js';
import { PostsService } from './Providers/posts.service.js';
import {UsersModule} from '../users/users.module.js'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity.js';
import { PaginationModule } from '../common/pagination/pagination.module.js';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule,TypeOrmModule.forFeature([Post]),PaginationModule],
})
export class PostsModule {}
