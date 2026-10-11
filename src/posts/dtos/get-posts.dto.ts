import { IntersectionType } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "../../common/pagination/dtos/pagination-query.dto";

class GetPostsBaseDto {
    @IsDate()
    @IsOptional()
    startdate?: Date;

    @IsDate()
    @IsOptional()
    enddate?: Date;
}

export class GetPostsDto extends IntersectionType(GetPostsBaseDto, PaginationQueryDto) {}