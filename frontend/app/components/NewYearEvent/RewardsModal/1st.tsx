import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import SnowItem from "@/app/components/NewYearEvent/Inventory/SnowItem";

const First = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();
    const [isTaken, ] = useState(!!config.taken_rewards[selectedDay])

    useEffect(() => {
        const take_award = async () => {
            const newConfig = {
                ...config,
                inventory: {
                    ...config.inventory,
                    snow:true
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
                &#34;Наступила зима. Вот-вот наступит Новый Год. Нужно уже начать готовиться... А вот и снежок выпал. Как красиво...
                Нужно будет поискать зимнюю одежду.. Так хочется выйти на улицу...&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Получено:
            </p>
            <SnowItem/>
            <button
                className="px-8 py-3 cursor-pointer mt-3 bg-pink-600 text-white rounded-full"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default First;