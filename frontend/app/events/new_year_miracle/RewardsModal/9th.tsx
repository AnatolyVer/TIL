import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import BallItem from "@/app/events/new_year_miracle/Inventory/BallItem";

const Modal9 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                dishes: {
                    ["cookies"]: 0,
                },
                inventory: {
                    ...config.inventory,
                    balls:true
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
                Сон:
            </p>
            <p className="text-pink-700 italic mb-2 text-sm lg:text-lg">
                Чей-то голос: Какие вкусные печенья у тебя получились.. Ммм, пальчики оближешь! Извини, но я не удержался и съел всё...
                За это я дам тебе ящик с шариками для ёлки. Надеюсь, это хоть как-то загладит мою вину...
            </p>
            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                После пробуждения ты идешь на кухню и видишь, что печенье пропало.
            </p>
            <p className="text-pink-700 italic mb-2 text-sm lg:text-lg">
                &#34;Я не понимаю.. кто он и как он сюда попал?.. И самый главный вопрос: как он мне приснился?.. &#34;
            </p>
            <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                Получено:
            </p>
            <BallItem/>
            <button
                className="px-8 py-3 mt-2 bg-pink-600 cursor-pointer text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Modal9;