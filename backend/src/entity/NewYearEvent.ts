import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewYearEventDocument = NewYearEvent & Document;

interface Inventory {
    snow: boolean;
    clothes: boolean;
    recipeBook: boolean;
    balls: boolean;
}

interface Locations {
    outside: boolean;
    home: boolean;
}

interface Question {
    question: string;
    options: string[];
    correct: number;
}

interface Recipe {
    name: string;
    questions: Question[];
}

@Schema()
export class NewYearEvent {
    @Prop({
        required: true,
        type: {
            snow: Boolean,
            clothes: Boolean,
            recipeBook: Boolean,
            balls: Boolean,
            mirror: Boolean,
        },
        default: { snow: false, clothes: false, recipeBook: false, balls: false, mirror: false },
    })
    inventory: Inventory;

    @Prop({
        required: true,
        type: {
            outside: Boolean,
            home: Boolean,
        },
        default: { outside: false, home: false },
    })
    locations: Locations;

    @Prop({
        type: {
            question: String,
            answer: String,
        },
        default: {},
    })
    talk: {question: string; answer: string; };

    @Prop({
        type: [
            {
                name: { type: String, required: true },
                alias: { type: String, required: true },
                questions: {
                    type: [
                        {
                            question: { type: String, required: true },
                            options: { type: [String], required: true },
                            correct: { type: Number, required: true, min: 0 },
                        },
                    ],
                    required: true,
                },
            },
        ],
        default: [],
    })
    recipes: Recipe[];

    @Prop({ type: Boolean, required: true, default: false })
    decrypted: boolean;

    @Prop({ type: Object, required: true})
    dishes: Record<string, number>;

    @Prop({ type: Object, required: true, default: {} })
    taken_rewards: Record<number, boolean>;
}

export const NewYearEventSchema = SchemaFactory.createForClass(NewYearEvent);