import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal20 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                &#34;Ладно.. появись...&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Голос в голове: Ты что-то хотела?
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Да... поблагодарить тебя за подарок.. и извиниться... ты мне приносишь новогоднее настроение, а я так себя веду..
                меня уже не пугает кто ты и чего ты хочешь..&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Голос в голове: Очень рад слышать. Да, кстати, у меня будет одна просьба.
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Какая?&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Голос в голове: Постарайся сохранить своё настроение и.. напиши список желаний, он тебе понадобится.
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

export default Modal20;