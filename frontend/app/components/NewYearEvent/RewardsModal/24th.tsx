import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import Image from "next/image";

const Modal24 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                Зеркало начало светиться. Ты подходишь к нему и видишь это..
            </p>
            <video src="/santa.mp4"
                   controls
                   autoPlay
                   className="aspect-video w-1/2 rounded-lg object-cover mb-2"
            >
            </video>
            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Голос в голове: У меня крупные связи. А ещё доступ к вебкамере ноутбука Мороза.
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

export default Modal24;