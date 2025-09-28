import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {FairyTale, FairyTaleSchema} from '../entity/FairyTale';
import {FairyTaleController} from "./fairyTale.controller";
import {FairyTaleService} from "./fairyTale.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FairyTale.name, schema: FairyTaleSchema }]),
    ],
    providers: [FairyTaleService],
    controllers: [FairyTaleController],
    exports: [FairyTaleService]
})
export class FairyTaleModule {}
