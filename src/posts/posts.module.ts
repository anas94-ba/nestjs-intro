import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller.js';
import { PostsService } from './Providers/posts.service.js';
import {UsersModule} from '../users/users.module.js'

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule]
})
export class PostsModule {}
