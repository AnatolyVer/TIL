import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal21 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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

            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Время идёт. Скоро Новый год.<br/>
                Снег и смех, игрушки и хлопушки —<br/>
                Последний месяц в календаре.
            </p>

            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Тепло любви, нежность и забота — такая вот моя работа:<br/>
                Дарить тебе украшение в серебре.
            </p>

            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Время идёт, меняются всегда сезоны, даты, события, ветра.<br/>
                Но лишь одно не изменилось —
            </p>

            <p className="text-pink-700 mb-2 text-sm lg:text-lg font-medium">
                Желание быть с тобой, гореть тобой, жить тобой.
            </p>

            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Хотя нет — вру, всё же изменилось:<br/>
                Ведь что бы в жизни ни случилось,<br/>
                Оно становится сильнее с каждым днём.
            </p>

            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Тебя люблю я третий Новый год — и будет счётчик их расти.<br/>
                Ты словно нужный кислород, с тебя не могу я глаз свести.
            </p>

            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                От твоей дивной красоты ты избавила от скукоты,<br/>
                Лишила прежней пустоты.
            </p>

            <p className="text-pink-700 text-sm lg:text-lg font-semibold">
                Сердце моё — твоё навек.
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

export default Modal21;