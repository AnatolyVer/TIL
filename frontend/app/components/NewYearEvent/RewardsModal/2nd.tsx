import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import ClothesItem from "@/app/components/NewYearEvent/Inventory/ClothesItem";

const Second = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();
    const [isTaken, ] = useState(!!config.taken_rewards[selectedDay])

    useEffect(() => {
        const take_award = async () => {
            const newConfig = {
                ...config,
                inventory: {
                    ...config.inventory,
                    clothes:true
                },
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
                &#34;Так.. насколько я помню, они должны быть где-то здесь... ну не могла же я их далеко спрятать... О, вот же они!&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Получено:
            </p>
            <ClothesItem/>
            <button
                className="px-8 py-3 mt-3 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Second;