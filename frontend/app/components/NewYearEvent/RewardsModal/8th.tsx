import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import Link from "next/link";

const Modal8 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();
    const [isTaken, ] = useState(!!config.taken_rewards[selectedDay])

    useEffect(() => {
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

        if (!isTaken)
            take_award().then();
    }, [dispatch, config, isTaken, selectedDay]);

    return (
        <>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Кто же это может быть?.. откуда появляются эти записки, ведь эта книга всегда со мной... <br/>
                Не хочу сейчас об этом думать, лучше испеку печенье.. Перед тем как готовить, лучше вспомнить рецепт...&#34;
            </p>
            <div className="mt-3 flex justify-around items-center w-4/4 lg:w-1/4">
                <Link href={`/miracle/cooking`}>
                    <button className="px-8 py-3 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg">
                        Готовить
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

export default Modal8;