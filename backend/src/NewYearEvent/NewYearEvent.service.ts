import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {NewYearEvent, NewYearEventDocument} from '../entity/NewYearEvent';

@Injectable()
export class NewYearEventService {
    constructor(
        @InjectModel(NewYearEvent.name) private NewYearModel: Model<NewYearEventDocument>,
    ) {}

    async getConfig() {
        const foundConfig = await this.NewYearModel.find().exec();
        if (foundConfig[0]) {
            return foundConfig[0];
        }
        else {
            const taken_rewards: Record<number, boolean> = {};
            for (let i = 1; i <= 31; i++) {
                taken_rewards[i] = false;
            }

            return await this.NewYearModel.create({
                taken_rewards, dishes: {
                    "cookies": 0,
                    "buns": 0
                }
            });
        }
    }

    async updateConfig(config: NewYearEvent) {
        return this.NewYearModel.updateOne({}, config, { upsert: true });
    }
}
