import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
    public constructor(
        @Inject(REQUEST)
        private readonly request: Request,
    ) {}

    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ) :Promise<Paginated<T>> {
        const limit = paginationQuery.limit ?? 10;
        const page = paginationQuery.page ?? 1;

        const results = await repository.find({
            skip: limit * (page - 1),
            take: limit,
        });

        const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
        const newURL = new URL(this.request.url, baseURL);

        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / limit);
        const nextPage = page < totalPages ? page + 1 : page;
        const prevPage = page > 1 ? page - 1 : page;

        const finalResponse: Paginated<T> = {
            data: results,
            meta: {
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
            },
            links: {
                first: `${newURL.origin}${newURL.pathname}?page=1&limit=${limit}`,
                last: `${newURL.origin}${newURL.pathname}?page=${totalPages}&limit=${limit}`,
                current: `${newURL.origin}${newURL.pathname}?page=${page}&limit=${limit}`,
                next: nextPage
                    ? `${newURL.origin}${newURL.pathname}?page=${nextPage}&limit=${limit}`
                    : '',
                previous: prevPage
                    ? `${newURL.origin}${newURL.pathname}?page=${prevPage}&limit=${limit}`
                    : '',
            },
        };
        return finalResponse;
    }
}