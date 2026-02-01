import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";

const Modal11 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>("");

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

    const ask = async () => {
        const newConfig = {
            ...config,
            talk: {
                question: message,
            }
        };
        try {
            await updateConfig(newConfig);
            dispatch(setNewYearConfig(newConfig));
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                После разгадки текст размывает, а затем меняется. Новая запись:
            </p>
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Я в тебе не сомневался, у тебя удивительные способности. Но это ещё не всё, мы обязательно потом во что-то поиграем.
                В награду я отвечу на один твой вопрос, но только на один. Подумай хорошенько, я всего рассказать не могу, пока что.
                Впиши его сюда, на этот листок.&#34;
            </p>

            {
                config.talk.question ? (
                    <p className="text-pink-700 mb-1 text-sm lg:text-lg">
                        Вопрос: {config.talk.question}
                    </p>
                ) : (
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                              cols={90} rows={3}
                              className='border border-black rounded-2xl p-5 text-pink-600'
                    >
                        </textarea>
                )
            }

            {
                config.talk.answer ? (
                    <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                        Ответ: {config.talk.answer}
                    </p>
                ) : (
                    <p className="text-pink-700 mb-3 text-sm lg:text-lg">
                        Без ответа
                    </p>
                )
            }
            <div className="mt-3 flex justify-around items-center w-full lg:w-1/4">
                {!config.talk.question && (
                    <button
                        className="px-8 py-3 bg-pink-600 cursor-pointer text-white rounded-full text-sm lg:text-lg"
                        onClick={ask}
                    >
                        Спросить
                    </button>
                )
                }
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

export default Modal11;