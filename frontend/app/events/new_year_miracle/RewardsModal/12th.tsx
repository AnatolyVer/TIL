import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal12 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (selectedDay === null) return;
        if (config.taken_rewards[selectedDay]) return;

        const take_award = async () => {
            const newConfig = {
                ...config,
                recipes: [
                    ...config.recipes,
                    {
                        name: "Булочки",
                        alias: "buns",
                        questions: [
                            {
                                question: "Сколько миллилитров тёплого молока нужно?",
                                options: ["100 мл", "150 мл", "200 мл", "250 мл"],
                                correct: 2
                            },
                            {
                                question: "Сколько сахара кладём?",
                                options: ["20 г", "30 г", "50 г", "100 г"],
                                correct: 2
                            },
                            {
                                question: "Что добавляем после активации дрожжей?",
                                options: ["Муку и соль", "Яйцо и мягкое масло", "Только муку", "Только масло"],
                                correct: 1
                            },
                            {
                                question: "Сколько муки нужно?",
                                options: ["200–250 г", "300–330 г", "350–380 г", "400–450 г"],
                                correct: 2
                            },
                            {
                                question: "Что добавляется вместе с мукой?",
                                options: ["Соль", "Сахар", "Корица", "Изюм"],
                                correct: 0
                            },
                            {
                                question: "Что делаем после первого подъёма теста?",
                                options: ["Сразу ставим в духовку", "Добавляем дрожжи", "Разделяем и формируем булочки", "Охлаждаем в холодильнике"],
                                correct: 2
                            },
                            {
                                question: "При какой температуре и сколько минут выпекаем?",
                                options: ["160°C — 20 минут", "170°C — 25 минут", "180°C — 15–18 минут", "200°C — 10 минут"],
                                correct: 2
                            },
                        ]

                    },

                ],
                taken_rewards: {
                    ...config.taken_rewards,
                    [selectedDay]: true,
                },
            };
            try {
                await updateConfig(newConfig);
                dispatch(setNewYearConfig(newConfig));
            }catch (e) {
                console.log(e)
            }
        }


            take_award().then();
    }, [dispatch, config, selectedDay]);



    return (
        <>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Ты решаешь встретиться с той женщиной, чтобы поговорить о том, что происходит.
                Она приглашает тебя завтра в гости. Ты решаешь приготовить что-то вкусное к чаю. В поисках рецепта ты натыкаешься
                на раздел выпечки.
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Выписан рецепт:
            </p>
            <p className="text-pink-700 italic text-sm lg:text-lg text-left w-9/10 lg:w-1/2">
                Ингредиенты:
                200 мл тёплого молока,
                60 г сливочного масла,
                50 г сахара,
                1 яйцо,
                7 г сухих дрожжей,
                350–380 г муки,
                0.5 ч. л. соли.
                По желанию: корица, ваниль, изюм, шоколад <br/>

                Приготовление: <br/>
                Тёплое молоко смешать с дрожжами и сахаром, оставить на 10 минут до появления пены.
                Добавить яйцо, мягкое сливочное масло, соль и частями вводить муку.
                Замесить мягкое, немного липкое тесто, накрыть и оставить подойти на 1 час.
                Подошедшее тесто обмять, разделить на небольшие шарики и сформировать булочки.
                Выложить на противень и оставить ещё на 20 минут для расстойки.
                Смазать яйцом или молоком.
                Выпекать 15–18 минут при 180°C до золотистой корочки.
            </p>

            <button
                className="px-8 py-3 mt-3 bg-pink-600 cursor-pointer text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Modal12;