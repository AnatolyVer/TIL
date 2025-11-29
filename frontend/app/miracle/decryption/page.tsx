"use client"

import React, {useState} from 'react';
import {updateConfig} from "@/app/api/newYear";
import {setNewYearConfig} from "@/lib/newYearEventSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const Page = () => {
    const config = useAppSelector(state => state.newYearEvent);
    const dispatch = useAppDispatch();
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('Впиши свой ответ здесь');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
        setMessage("Впиши свой ответ здесь")
    }

    const check = async () => {
        const text = "Do you believe in miracles? After all, miracles do happen - you are the brightest proof of that!"
        if (text.toLowerCase() == answer.toLowerCase()) {
            setMessage("Даже Грок не справился с этим, молодец!")
            const newConfig = {
                ...config,
                decrypted: true
            };
            try {
                await updateConfig(newConfig);
                dispatch(setNewYearConfig(newConfig));
            }catch (e) {
                console.log(e)
            }
        }
        else setMessage("Нет, не оно.. попробуй еще.")
    }

    return (
        <div className="relative flex justify-center items-center w-full h-[calc(100vh-72px)]">
            <Link href="/miracle">
                <ArrowBackIcon sx={{ fontSize: {
                        sm: 60,
                        l: 100,
                    } }} className="absolute top-[2%] left-[2%] z-9999 cursor-pointer"/>
            </Link>
            <div className="w-9/10 lg:w-1/2 h-6/8 lg:h-8/10 flex flex-col justify-between items-center  bg-white shadow-2xl rounded-2xl p-5 lg:p-10">
                <p className="lg:text-5xl tracking-widest leading-loose text-pink-600">
                    Yf pfz dasekok er jemcwskb? Cnham css, jemcwskb yf qcvvr - pfz cmk hqk dmeoqhabh vmffn fn hqch!
                </p>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl lg:text-3xl tracking-widest leading-loose text-pink-600">
                        {message}
                    </p>
                    <textarea value={answer} onChange={handleChange} className="border-2 text-pink-600 text-xl lg:text-3xl p-4 border-black rounded w-full" cols={100} rows={3}></textarea>
                    <button
                        className="px-8 py-3 mt-3 bg-pink-600 cursor-pointer text-white rounded-full text-sm lg:text-lg"
                        onClick={check}
                    >
                        Проверить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;