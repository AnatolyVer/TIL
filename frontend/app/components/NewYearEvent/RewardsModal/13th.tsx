import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {updateConfig} from "@/app/api/newYear";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Modal13 = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {

    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();
    const [isTaken, ] = useState(!!config.taken_rewards[selectedDay])
    const [page, setPage] = useState(1);

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
            <div className="flex gap-3 justify-center w-full items-center mb-2">
                <ArrowBackIosNewIcon className={`cursor-pointer text-pink-700 text-sm lg:text-lg ${page === 1 ? "pointer-events-none opacity-25" : ""}`}
                                     onClick={() => setPage(1)}
                />
                <p className="text-pink-700 text-sm lg:text-lg">{page}</p>
                <ArrowForwardIosIcon className={`cursor-pointer text-pink-700 text-sm lg:text-lg ${page === 2 ? "pointer-events-none opacity-25" : ""}`}
                                     onClick={() => setPage(2)}
                />
            </div>
            {
                page === 1 ? (
                    <>
                        <p className="text-pink-700 italic mb-2 text-sm lg:text-lg">
                            &#34;У неё очень уютно..&#34;
                        </p>
                        <p className="text-pink-700 italic mb-2 text-left self-start text-sm lg:text-lg">
                            — У меня как раз закипел чайник. Тебе сколько сахара, милая?<br/>
                            — Сахар не нужно добавлять, спасибо. Если честно, то я к вам по делу.. не знаю даже как сказать... возможно, вы мне не поверите..<br/>
                            — У меня нет причин не верить. К тому же, не думаю, что ты хочешь о чём-то соврать.<br/>
                            — Просто что-то странное происходит.. Сначала та записка в книге рецептов, о которой я вам говорила. По возвращению домой текст поменялся..
                            словно со мной кто-то говорит... он мне несколько раз снился даже. Первый раз только его голос, затем добавился силует.. После первого сна пропало печенье,
                            которое я приготовила перед тем, как лечь спать. Я знала, что его не будет.. он мне так сказал..<br/>
                            — Хм.. довольно интересно..<br/>
                            — Взамен он дал мне коробку с шариками для ёлки. Я сначала боялась их трогать, но потом решила украсить ёлку на улице. А затем он дал мне зашифрованное послание,
                            я потратила какое-то время, но в конце концов смогла разобрать его.. вот, смотрите.
                        </p>

                    </>
                ) : (
                    <>
                        <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                            Ты протягиваешь ей свой черновик, в котором ты делала пометки в попытках разгадать шифр.
                        </p>
                        <p className="text-pink-700 italic mb-2 text-left self-start text-sm lg:text-lg">
                            — Ты уж прости меня, милая.. я не понимаю...<br/>
                            — Если коротко, то он спросил, верю ли я в чудеса. И сам назвал меня чудом.<br/>
                            — Как это мило с его стороны..<br/>
                            — Потом он дал мне возможность написать ему. Я не понимаю его умысел и оттого мне не по себе...<br/>
                            — Понимаю.. боюсь представить твои чувства сейчас...<br/>
                            — Я просто хотела с кем-то об этом поговорить.. подумала, раз все началось с вашей книги рецептов, то и начать стоит с вас..
                        </p>
                        <p className="text-pink-700 mb-2 text-sm lg:text-lg">
                            Какое-то время вы сидите и мило общаетесь о всяком. Никакой информации от неё ты не получила, но тебе стало легче на душе.
                            По возвращению домой ты находишь ещё одну записку:
                        </p>
                        <p className="text-pink-700 italic mb-2 text-sm lg:text-lg">
                            &#34;Ты всегда можешь обсудить это со мной. Как и всё остальное...&#34;
                        </p>
                    </>
                )
            }
            <button
                className="px-8 py-3 mt-3 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg"
                onClick={() => setSelectedDay(null)}
            >
                Закрыть
            </button>
        </>
    );
};

export default Modal13;