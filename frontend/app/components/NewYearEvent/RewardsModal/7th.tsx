import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal7 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (selectedDay === null) return;
        if (config.taken_rewards[selectedDay]) return;

        const take_award = async () => {
            const newConfig = {
                ...config,
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
            <p className="text-pink-700 italic mb-2 text-left text-sm lg:text-lg">
                — Здравствуйте, как же мне повезло вас встретить. Я хотела вернуть вам вашу книгу рецептов, она вам, наверное, очень дорога,
                там записка для вас от некого А. <br/>
                — Ой, привет, милое дитя. Какая записка? Там ничего подобного нет.. да и никакого А. я не знаю...  <br/>
                — Ну как же.. вот, смотрите... <br/>
            </p>
            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Там не оказалось той записки
            </p>
            <p className="text-pink-700 italic mb-2 text-left text-sm lg:text-lg">
                — Как странно... я же видела её там, она точно там была. Не могло же мне привидеться..<br/>
                — Может твой поклонник подложил тебе эту записку?<br/>
                — Невозможно, никого, кроме меня дома не было.. Возможно, мне правда показалось...
                Пойду-ка я домой, приготовлю овсяных печеньев по рецепту из книги. Всего хорошего!
            </p>
            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                По возвращению домой ты открываешь книгу. Записка находится там, где и была. Но к твоему большему удивлению, текст изменился:
            </p>
            <p className="text-pink-700 italic mb-2 text-sm lg:text-lg">
                &#34;Возможно, стоило подписаться как-то иначе. Но так будет неинтересно...&#34;
            </p>
            <button
                className="px-8 py-3 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Modal7;