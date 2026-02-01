"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import MirrorItem from "@/app/events/new_year_miracle/Inventory/MirrorItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import {motion} from "framer-motion";
import {updateConfig} from "@/app/api/newYear";
import {setNewYearConfig} from "@/lib/newYearEventSlice";

const Page = () => {
    const [isLandscape, setIsLandscape] = useState(true);
    const config = useAppSelector(state => state.newYearEvent);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const check = () => {
            const landscape = window.matchMedia("(orientation: landscape)").matches ||
                window.innerWidth > window.innerHeight;
            setIsLandscape(landscape);
        };
        check();
        window.addEventListener("resize", check);
        window.addEventListener("orientationchange", check);
        return () => {
            window.removeEventListener("resize", check);
            window.removeEventListener("orientationchange", check);
        };
    }, []);

    useEffect(() => {
        if (!isLandscape && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isLandscape]);

    const handleOpen = () => {

        const take_award = async () => {
            const newConfig = {
                ...config,
                inventory: {
                    ...config.inventory,
                    mirror:true
                },
            };
            try {
                await updateConfig(newConfig);
                dispatch(setNewYearConfig(newConfig));
            }catch (e) {
                console.log(e)
            }
        }

        if (!isModalOpen) {
            setIsModalOpen(true);
            if (!config.taken_rewards[19]) {
                take_award().then();
            }
        }
        else setIsModalOpen(false);
    }

    return (
        <>
            <div className={`relative ${isLandscape ? "block" : "hidden"} flex justify-center items-end w-full min-h-[calc(100vh-72px)]`}>
                <Link href="/events/new_year_miracle">
                    <ArrowBackIcon sx={{ fontSize: {
                            sm: 60,
                            l: 100,
                        } }} className="absolute top-[2%] left-[2%] z-9999 cursor-pointer"/>
                </Link>
                <Image
                    src="/room.jpg"
                    alt="room"
                    priority
                    quality={100}
                    fill
                    className="absolute bottom-0 w-full h-1/2 z-2"
                />

                {
                    config.taken_rewards[18] &&
                    <Image
                        src="/sock.png"
                        alt="sock"
                        priority
                        quality={100}
                        width={400}
                        height={400}
                        className="absolute top-[40%] cursor-pointer left-[40%] w-1/10 z-10"
                        onClick={handleOpen}
                    />
                }

            </div>
            {isModalOpen && (
                <motion.div
                    className="fixed w-[100vw] h-[calc(100vh-72px)] bottom-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <motion.div
                        className="bg-white p-4 rounded-3xl max-w-5xl lg:max-w-7xl  text-center flex flex-col items-center relative overflow-hidden"
                        initial={{ scale: 0.7, y: 120, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >

                        {
                            config.taken_rewards[19] ? (
                                <>
                                    <p className="text-pink-700 italic text-sm lg:text-lg">
                                        &#34;Это тебе наш общий подарок с Колей. Твой А.&#34;
                                    </p>
                                    <p className="text-pink-700 mt-2 text-sm lg:text-lg">
                                        Получено:
                                    </p>
                                    <MirrorItem/>
                                </>
                                ) : (
                                <p className="text-pink-700 italic text-sm lg:text-lg">
                                    Здесь ничего нет.
                                </p>
                            )
                        }
                        <button
                            className="px-8 py-3 mt-2 cursor-pointer bg-pink-600 text-white rounded-full text-sm lg:text-lg"
                            onClick={handleOpen}
                        >
                            Закрыть
                        </button>
                    </motion.div>
                </motion.div>
            )}




            {!isLandscape && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="text-white text-center p-8 max-w-xs">
                        <div className="mb-8">
                            <svg className="mx-auto w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 16h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4-3h.01M12 14h.01" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Поверни устройство</h2>
                        <p>Для лучшего просмотра нужна альбомная ориентация</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;