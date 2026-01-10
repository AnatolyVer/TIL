import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WatchListDocument = WatchList & Document;

@Schema()
export class WatchList {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true, default: Date.now})
    created_at: number;
}

export const WatchListSchema = SchemaFactory.createForClass(WatchList);
