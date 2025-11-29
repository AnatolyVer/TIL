import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import Link from "next/link";

const Modal10 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Сон:
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                Силует: Я очень надеюсь, что тебе понравились шарики для ёлки. Честно говоря, мне стало скучновато..
                Я оставил тебе под подушкой листок. Ты так сладко спала.. Кхм, в общем, ты поймешь, что с ним делать.
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                После пробуждения ты находишь под подушкой листок. На нем есть текст, но он запутанный. Возможно, это какой-то шифр...
            </p>
            <div className="mt-3 flex justify-around items-center w-full lg:w-1/4">
                <Link href={`/miracle/decryption`}>
                    <button className="px-8 py-3 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg">
                        Разгадать
                    </button>
                </Link>
                <button
                    className="px-8 py-3 bg-pink-600 cursor-pointer text-white rounded-full text-sm lg:text-lg"
                    onClick={() => setSelectedDay(null)}
                >
                    Закрыть
                </button>
            </div>
        </>
    );
};

export default Modal10;