import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Inventory {
    snow: boolean;
    clothes: boolean;
    recipeBook: boolean;
    balls: boolean;
    mirror: boolean;
}

interface Question {
    question: string;
    options: string[];
    correct: number;
}

interface Recipe {
    name: string;
    alias: string;
    questions: Question[];
}

interface Locations {
    outside: boolean;
    home: boolean;
}

interface Dishes {
    [key: string]: number;
}

export interface NewYearEventState {
    inventory: Inventory;
    recipes: Recipe[];
    dishes: Dishes;
    decrypted: boolean;
    locations: Locations;
    taken_rewards: Record<number, boolean>;
    talk: {
        question: string;
        answer?: string;
    }
}

const initialState: NewYearEventState = {
    inventory: {
        snow: false,
        clothes: false,
        recipeBook: false,
        balls: false,
        mirror: false,
    },
    recipes: [],
    talk: {
        question: "",
        answer: ""
    },
    dishes: {},
    decrypted: false,
    locations: {
        outside: false,
        home: false,
    },
    taken_rewards: {},
};

const NewYearSlice = createSlice({
    name: 'newYearEvent',
    initialState,
    reducers: {
        setNewYearConfig(state, action: PayloadAction<Partial<NewYearEventState>>) {
            Object.assign(state, action.payload);
        }
    },
});

export const { setNewYearConfig } = NewYearSlice.actions;
export default NewYearSlice.reducer;