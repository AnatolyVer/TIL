import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {WatchList} from "../entity/WatchList";
import {WatchListService} from "./WatchList.service";

@Controller('watchlist')
export class WatchListController {
    constructor(private readonly WatchListService: WatchListService) {}

    @Get()
    async getAll() {
        try {
            return await this.WatchListService.getAll();
        }
        catch (error) {
            return error;
        }
    }

    @Post()
    async add(@Body() item: WatchList) {
        try {
            return await this.WatchListService.create(item)
        }
        catch (error) {
            return error;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() changes: Partial<WatchList>) {
        try {
            return await this.WatchListService.update(id, changes)
        }
        catch (error) {
            return error;
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string ) {
        try {
            return await this.WatchListService.delete(id)
        }
        catch (error) {
            return error;
        }
    }
}