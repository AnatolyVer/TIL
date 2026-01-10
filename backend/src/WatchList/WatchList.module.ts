import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {WatchList, WatchListSchema} from "../entity/WatchList";
import {WatchListController} from "./WatchList.controller";
import {WatchListService} from "./WatchList.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: WatchList.name, schema: WatchListSchema }]),
    ],
    providers: [WatchListService],
    controllers: [WatchListController],
    exports: [WatchListService]
})
export class WatchListModule {}
