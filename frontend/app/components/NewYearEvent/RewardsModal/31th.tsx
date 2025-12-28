import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

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
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Сегодня наступает Новый Год
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Я хочу поблагодарить тебя за всё то время, веселье и радость, что ты подарила мне.
                Спасибо тебе за всё. За твою любовь и нежность, заботу и ласку. За все теплые воспоминания и эмоции, что связаны с тобой.
                Я буду бережно хранить их в своём сердце, что принадлежит тебе.
                Основной текст поздравления будет потом, когда часы пробьют 12.
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                С Новым Годом, моя самая сильная любовь.. Твой А.
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                P.S. При клике взрывается фейерверк.
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