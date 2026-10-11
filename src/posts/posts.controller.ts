import { Body, Controller, Get, Param, Patch, Post,Query } from '@nestjs/common';
import {PostsService} from"./Providers/posts.service.js";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto.js';
import { PatchPostDto } from './dtos/patch-post.dto.js';
import { GetPostsDto} from './dtos/get-posts.dto.js';


@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        private readonly postsService:PostsService
    ){

    }

    @Get("/:userId")
    public getPosts(@Param("userId") id:string, @Query() getPostsDto: GetPostsDto){
        console.log(getPostsDto);
        return this.postsService.findAll(id,getPostsDto);

    }

    @ApiOperation({summary:"Create a new post"})
    @ApiResponse({status:201,description:"The post was created successfully"})
    @Post("/")
    public createPost(@Body() createPostDto:CreatePostDto){
        return this.postsService.CreatePost(createPostDto);
    }

    @Patch("/")
    public updatePost(@Body() patchPostDto:PatchPostDto){
        return patchPostDto;
    }
}
