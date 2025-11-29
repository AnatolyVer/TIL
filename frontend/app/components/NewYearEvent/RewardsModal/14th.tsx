import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal14 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
            <p className="text-pink-700 italic mb-3 text-left text-sm lg:text-lg">
                Сон:
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                &#34;И снова я не вижу его лица..&#34;
            </p>
            <p className="text-pink-700 italic mb-3 text-left self-start text-sm lg:text-lg">
                — Кто ты такой?<br/>
                — Это так не работает. Особенно без приветствия.<br/>
                — Я не знаю кто ты и какие преследуешь цели.<br/>
                — Справедливо. Но если бы я хотел навредить, то уже бы сделал это.<br/>
                — Ты съел мое печенье! Я его готовила для себя!<br/>
                — За это прошу прощения. Да и думаю, мой подарок извинился за меня намного лучше.<br/>
                — Что тебе нужно?<br/>
                — О, я преследую много целей. Но ничего из этого не навредит тебе, даже наоборот.<br/>
                — Слишком обобщенно, не находишь?<br/>
                — Ещё не время. Чуть позже ты узнаешь больше. А тебе уже пора вставать. Кстати, булочки получились восхитительные. Но не бойся, я съел всего-лишь одну.<br/>

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

export default Modal14;