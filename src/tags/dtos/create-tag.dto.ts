import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, isString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(256)
    name:string;

    @ApiProperty({description:"The slug of the post", minLength:3})
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "slug must be in lowercase and can contain only letters, numbers, and hyphens"
    })
    slug:string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?:string;
    @ApiPropertyOptional()
    @IsJSON()
    @IsOptional()
    schema?:string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?:string;

}