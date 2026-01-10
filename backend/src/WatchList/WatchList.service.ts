import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {WatchList, WatchListDocument} from '../entity/WatchList';

@Injectable()
export class WatchListService {
    constructor(
        @InjectModel(WatchList.name) private WatchListModel: Model<WatchListDocument>,
    ) {}

    async getAll() {
        return this.WatchListModel.find();
    }

    async create(watchList: WatchList) {
        return await this.WatchListModel.create(watchList);
    }

    async update(id: string, changes: Partial<WatchList>) {
        return this.WatchListModel.findByIdAndUpdate(id, {...changes, created_at: Date.now()});
    }

    async delete(id: string) {
        return this.WatchListModel.findByIdAndDelete(id)
    }
}
