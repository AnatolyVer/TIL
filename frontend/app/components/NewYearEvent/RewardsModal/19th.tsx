import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import RoomLocation from "@/app/components/NewYearEvent/Inventory/RoomLocation";
import SockItem from "@/app/components/NewYearEvent/Inventory/SockItem";

const Modal18 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                &#34;Что за звуки в комнате с камином? Нужно проверить..&#34;
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

export default Modal18;