import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal15 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                Крутится глобус. Медленно, будто хочет усыпить тебя в твоем же сне.
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Что это может значить?...&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                По пробуждению ты понимаешь, что на твоем лице лежит маленький листик. На нем послание:
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Ты определенно знаешь, что с этим делать. Это даст понятие о моих намерениях...&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                В голове повторяются цифры: 24.838349, 55.405110
            </p>
            <p className="text-pink-700 italic mb-3 text-lg">
                &#34;Откуда они в моей голове?..&#34;
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

export default Modal15;