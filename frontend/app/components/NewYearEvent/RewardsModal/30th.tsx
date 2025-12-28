import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import Image from "next/image";

const Modal28 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                Обещаю, в новом году мы создадим ещё больше ярких и теплых воспоминаний.
                Хочу каждый день радовать тебя и дарить тебе улыбку..
                Но одно останется неизменным. Ты будешь моим самым ярким воспоминанием...
            </p>
            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Календарь подходит к концу. Надеюсь, тебе очень понравилось.
                У меня есть одна идея для этого сайта. Но о ней немного позже. Надеюсь, тебе понравится задумка.
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

export default Modal28;