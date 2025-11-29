import {Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import { NewYearEventService } from './NewYearEvent.service';
import {NewYearEvent} from "../entity/NewYearEvent";

@Controller('new_year')
export class NewYearEventController {
    constructor(private readonly NewYearService: NewYearEventService) {}

    @Get()
    async getConfig() {
        return this.NewYearService.getConfig();
    }

    @Post()
    async add(@Body() config: NewYearEvent) {
        return this.NewYearService.updateConfig(config);
    }
}
