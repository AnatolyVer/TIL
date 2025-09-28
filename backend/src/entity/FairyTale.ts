import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FairyTaleDocument = FairyTale & Document;

@Schema()
export class FairyTale {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    img_link: string;

    @Prop({ required: true })
    link: string;
}

export const FairyTaleSchema = SchemaFactory.createForClass(FairyTale);
