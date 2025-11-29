import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal16 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

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
                &#34;Кто же он такой... он же не может быть реальным человеком...&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Голос в голове: Ещё как могу. Как бы ты тогда получала от меня записки, послания?
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Ты уже не стесняешься?&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Голос в голове: Поздравляю, теперь мы можем общаться наяву. Хотя ты и так это уже поняла.
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Как ты это делаешь? Это что, маг..&#34;
            </p>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                Голос в голове: Магия? Ни в коем случае. Я называю это чудом. Но я не могу общаться с тобой тогда, когда ты не хочешь этого.
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Значит прочь из моей головы!&#34;
            </p>
            <p className="text-pink-700 self-center mb-3 text-sm lg:text-lg">
                Ответа не последовало. Но на столе оказалась записка:
            </p>
            <p className="text-pink-700 italic self-center mb-3 text-sm lg:text-lg">
                &#34;Ты хотела получить ответы. На часть из них я ответил. Если захочешь поговорить, просто подумай об этом.&#34;
            </p>
            <button
                className="px-8 py-3 mt-3 cursor-pointer self-center bg-pink-600 text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Modal16;