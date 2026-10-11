import { Injectable } from '@nestjs/common';
import{UsersService} from '../../users/Providers/users.service.js'
import { Repository } from 'typeorm';
import { Post } from '../post.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto.js';
import { GetPostsDto } from '../dtos/get-posts.dto.js';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider.js';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface.js';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService:UsersService,
        @InjectRepository(Post)
        private readonly postsRepository:Repository<Post>,
        private readonly paginationProvider:PaginationProvider
    ){

    }
    public CreatePost(PostDto:CreatePostDto){
        const newPost=this.postsRepository.create(PostDto);
        return this.postsRepository.save(newPost);
    }
    public async findAll(userId:string, getPostsDto: GetPostsDto):Promise<Paginated<Post>>{
        let posts=await this.paginationProvider.paginateQuery(getPostsDto,this.postsRepository);
        return posts;

    }
}
