import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal5 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                        name: "Овсяное печенье",
                        alias: "cookies",
                        questions: [
                            { question: "Сколько граммов сливочного масла нужно?", options: ["50 г", "80 г", "100 г", "150 г"], correct: 2 },
                            { question: "Сколько сахара кладём?", options: ["50 г", "80 г", "100 г", "200 г"], correct: 2 },
                            { question: "Что добавляем после того, как взбили масло с сахаром?", options: ["Муку", "Овсяные хлопья", "Яйцо", "Разрыхлитель"], correct: 2 },
                            { question: "Сколько муки нужно?", options: ["50 г", "80 г", "120 г", "200 г"], correct: 1 },
                            { question: "Что добавляем вместе с мукой?", options: ["Соль и ваниль", "Разрыхлитель и соль", "Шоколад и изюм", "Яйцо и овсянку"], correct: 1 },
                            { question: "Что кладём самым последним (обязательный ингредиент)?", options: ["Муку", "Яйцо", "Овсяные хлопья", "Шоколад"], correct: 2 },
                            { question: "При какой температуре и сколько минут печём?", options: ["160°C — 15 минут", "180°C — 10–12 минут", "200°C — 8 минут", "170°C — 20 минут"], correct: 1 },
                        ],
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
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Попробую найти ту женщину. Хочу спросить кто такой этот А. Возможно, стоит вернуть книгу, она, должно быть, ей очень дорога..
                Нужно хотя-бы выписать рецепт тех овсяных печеньев..&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Выписан рецепт:
            </p>
            <p className="text-pink-700 italic text-sm lg:text-lg text-left w-9/10 lg:w-1/2">
                Ингредиенты: <br/>
                100 г сливочного масла,
                100 г сахара,
                1 яйцо,
                120 г овсяных хлопьев,
                80 г муки,
                1 ч. л. разрыхлителя,
                щепотка соли.
                По желанию: ваниль, шоколад, изюм, орехи. <br/>
                Приготовление:
                Размягчённое масло взбить с сахаром, добавить яйцо и перемешать.
                Добавить муку, разрыхлитель, соль и снова перемешать.
                Добавить овсяные хлопья и, по желанию, дополнительные ингредиенты.
                Сформировать печеньки и выложить на противень.
                Выпекать 10–12 минут при 180°C, пока края слегка подрумянятся.
            </p>
            <button
                className="px-8 py-3 mt-3 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Modal5;


