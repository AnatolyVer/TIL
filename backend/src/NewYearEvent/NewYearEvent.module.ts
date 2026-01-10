import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {NewYearEvent, NewYearEventSchema} from '../entity/NewYearEvent';
import {NewYearEventController} from "./NewYearEvent.controller";
import {NewYearEventService} from "./NewYearEvent.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: NewYearEvent.name, schema: NewYearEventSchema }]),
    ],
    providers: [NewYearEventService],
    controllers: [NewYearEventController],
    exports: [NewYearEventService]
})
export class NewYearEventModule {}
