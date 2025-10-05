import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FairyTale, FairyTaleDocument } from '../entity/FairyTale';

@Injectable()
export class FairyTaleService {
    constructor(
        @InjectModel(FairyTale.name) private fairyTaleModel: Model<FairyTaleDocument>,
    ) {}

    async add() {
        const fairyA: FairyTale[] = [
            {
                name: "Рике с хололком",
                img_link: "https://nukadeti.ru/content/images/static/tale400x400_m/1834_328.webp",
                link: "https://drive.google.com/uc?export=download&id=1btJBaUqWNgH9rOJI70O1RWms6x_HZrJi",
            },

        ]
        for (const fairy of fairyA) {
            const newUser = new this.fairyTaleModel(fairy);
            await newUser.save();
        }

    }

    async findAll(): Promise<FairyTale[]> {
        return this.fairyTaleModel.find().select('-link').exec();
    }

    async findById(id: string): Promise<FairyTale | null> {
        return this.fairyTaleModel.findById(id).exec();
    }
}
