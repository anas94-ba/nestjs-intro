import { Controller, Get, Param } from '@nestjs/common';
import {PostsService} from"./Providers/posts.service.js"


@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService:PostsService
    ){

    }

    @Get("/:userId")
    public getPosts(@Param("userId") id:string){
        return this.postsService.findAll(id);

    }
}
