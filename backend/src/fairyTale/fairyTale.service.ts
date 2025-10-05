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
                name: "Храбрый портняжка",
                img_link: "http://www.planetaskazok.ru/images/stories/grimm/hrabry_portneajka/hrabp1.jpg",
                link: "https://drive.google.com/uc?export=download&id=1lIN3kdhHfe5KF84PdtISA6WDP6cU2uVv",
            },
            {
                name: "Новое платье короля",
                img_link: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjd4dBJbqJsyt9ux-96RblfOSe_ozRs2RTq7bmDAaDouvhXVnJK1VFnofdLSYU3boMchgQesXQN_g3osnFhLEjD-zBEMHPxZu6IdCiMKpXP8VqUH8sMppqhRAFR8WZ44miAYjQ9TGrv_E8/s1600/450.png",
                link: "https://drive.google.com/uc?export=download&id=1OpK_MOONgjhXKxahLpJk1bCpZ6KIaNsQ",
            },
            {
                name: "Есть же разница",
                img_link: "https://moreskazok.ru/images/andersen/est-zhe-raznitsa-2.jpg",
                link: "https://drive.google.com/uc?export=download&id=1xvLu4HtyMMX-mdXIqI8uTFTlNH8w4nPe",
            },
            {
                name: "Двенадцать пассажиров",
                img_link: "https://nukadeti.ru/content/images/static/tale400x400_m/7021_3622.webp",
                link: "https://drive.google.com/uc?export=download&id=1JTW1fYFnhh0u5kC85SDkdS8hdJ8Zmlgc",
            }
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
