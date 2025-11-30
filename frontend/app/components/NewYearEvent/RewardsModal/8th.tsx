import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import Link from "next/link";
import OutsideLocation from "@/app/components/NewYearEvent/Inventory/OutsideLocation";
import KitchenLocation from "@/app/components/NewYearEvent/Inventory/KitchenLocation";

const Modal8 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Кто же это может быть?.. откуда появляются эти записки, ведь эта книга всегда со мной... <br/>
                Не хочу сейчас об этом думать, лучше испеку печенье.. Перед тем как готовить, лучше вспомнить рецепт...&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Открыто:
            </p>
            <KitchenLocation/>
            <div className="mt-3 flex justify-around items-center w-4/4 lg:w-1/4">
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