import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FairyTale, FairyTaleDocument } from '../entity/FairyTale';

@Injectable()
export class FairyTaleService {
    constructor(
        @InjectModel(FairyTale.name) private fairyTaleModel: Model<FairyTaleDocument>,
    ) {}

    async add(): Promise<FairyTale> {
        const fairy: FairyTale = {
            name: "Гензель и Гретель",
            img_link: "https://pikabu.ru/story/genzel_i_gretel__surovaya_nemetskaya_skazka_9862626",
            link: "https://drive.google.com/uc?export=download&id=10ag0Iq1Tmr34qKSxI5Ffksfpoo57XaP8",
        }
        const newUser = new this.fairyTaleModel(fairy);
        await newUser.save();
        return newUser;
    }

    async findAll(): Promise<FairyTale[]> {
        return this.fairyTaleModel.find().select('-link').exec();
    }

    async findById(id: string): Promise<FairyTale | null> {
        return this.fairyTaleModel.findById(id).exec();
    }
}
