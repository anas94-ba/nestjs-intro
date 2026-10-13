import { PostType } from "../enums/postType.enum";
import { PostStatus } from "../enums/postStatus.enum";
import { IsArray, isArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, min, MinLength, ValidateNested } from 'class-validator';
import { CreatePostMetaOptionDto } from "../../meta-options/dtos/create-post-meta-option.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {

  @ApiProperty({description:"The title of the post", minLength:3})
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @ApiProperty({description:"The type of the post", enum:PostType})
  @IsEnum(PostType)
  postType: PostType;

  @ApiProperty({description:"The slug of the post", minLength:3})
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "slug must be in lowercase and can contain only letters, numbers, and hyphens"
  })
  slug: string;

  @ApiProperty({description:"The status of the post", enum:PostStatus})
  @IsEnum(PostStatus)
  status:PostStatus;

  
  @ApiPropertyOptional({description:"The content of the post"})
  @IsOptional()
  @IsString()
  content?:string;

  @ApiPropertyOptional({description:"The JSON schema for the post"})
  @IsOptional()
  @IsJSON()
  schema?:string;

  @ApiPropertyOptional({description:"The URL of the featured image for the post"})
  @IsOptional()
  @IsUrl()
  featuredImageUrl?:string;

  @ApiPropertyOptional({description:"The date and time when the post was published"})
  @IsOptional()
  @IsISO8601()
  publishedOn?:string;

  @ApiPropertyOptional({description:"The tags for the post"})
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?:string[];

  @ApiPropertyOptional({
    description: "The meta options for the post",
    required: false,
    items: { 
        type: "object",
        properties: {
            key: { type: "string" , description: "The key of the meta option" },
            Value: { type: "any" , description: "The value of the meta option" }
        }
     }
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?:CreatePostMetaOptionDto;
}