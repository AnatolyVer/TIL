"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const BALL_POSITIONS = [
    { x: 50, y: 25 },
    { x: 33, y: 50 },
    { x: 60, y: 45 },
    { x: 45, y: 38 },
    { x: 65, y: 58 },
    { x: 40, y: 60 },
    { x: 35, y: 78 },
    { x: 65, y: 70 },
    { x: 50, y: 68 },
    { x: 50, y: 88 },
    { x: 30, y: 88 },
    { x: 70, y: 83 },
];

type SnowmanPart = 'bottom' | 'middle' | 'head' | 'hat';
type SnowmanState = SnowmanPart[];

export default function Page() {
    const config = useAppSelector(state => state.newYearEvent);
    const [isLandscape, setIsLandscape] = useState(true);
    const [snowmanParts, setSnowmanParts] = useState<SnowmanState>([]);

    useEffect(() => {
        const saved = localStorage.getItem('snowman-2025');
        if (saved) {
            setSnowmanParts(JSON.parse(saved));
        }

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

    useEffect(() => {
        if (snowmanParts.length > 0) {
            localStorage.setItem('snowman-2025', JSON.stringify(snowmanParts));
        } else {
            localStorage.removeItem('snowman-2025');
        }
    }, [snowmanParts]);



    const handleSnowmanClick = () => {
        if (snowmanParts.length >= 4) return;

        const nextPart: SnowmanPart =
            snowmanParts.length === 0 ? 'bottom' :
                snowmanParts.length === 1 ? 'middle' :
                    snowmanParts.length === 2 ? 'head' : 'hat';

        setSnowmanParts(prev => [...prev, nextPart]);
    };

    const hasBalls = config.inventory.balls;

    return (
        <>
            <div className={`fixed inset-0 ${isLandscape ? "block" : "hidden"}`}>
                <Link href="/miracle">
                    <ArrowBackIcon sx={{ fontSize: 100 }} className="absolute top-[10%] left-[2%] z-9999 cursor-pointer"/>
                </Link>
                <Image src="/outside_bg.png" alt="Background" fill quality={95} priority className="object-cover" />
                <Image src="/outside_snow.png" alt="Snow" fill quality={95} priority
                       className="object-cover object-bottom mix-blend-screen pointer-events-none" />

                <div className="absolute bottom-10 left-[5%] md:left-[10%] lg:left-[15%]
                               w-[20vw] max-w-6xl z-10 select-none">
                    <Image
                        src="/outside_tree.png"
                        alt="Christmas tree"
                        width={1600}
                        height={1600}
                        priority
                        quality={100}
                        className="w-full h-1/2 drop-shadow-2xl"
                    />

                    {hasBalls && BALL_POSITIONS.map((pos, i) => (
                        <div
                            key={i}
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                            }}
                        >
                            <div
                                className="relative w-3 h-3 md:w-12 md:h-12 lg:w-7 lg:h-7
                       rounded-full
                       bg-gradient-to-br from-red-500 via-red-600 to-red-700
                       shadow-2xl
                       border border-red-400/50"
                                style={{ '--i': i } as React.CSSProperties}
                            >
                                <div className="absolute inset-0 rounded-full
                            bg-red-400/30 blur-xl animate-ping
                            [animation-delay:calc(var(--i)*0.2s)]"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="absolute bottom-8 right-[45%]
    w-[200px] h-[300px]
    md:w-[260px] md:h-[400px]
    cursor-pointer z-20 select-none"
                    onClick={handleSnowmanClick}
                >
                    {/* === ОСНОВАНИЕ — видно, куда кликать! === */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                    w-32 md:w-56 lg:w-64 h-12 md:h-28
                    bg-white/95 rounded-full shadow-2xl
                    border-8 border-sky-50
                    animate-pulse
                    pointer-events-none">
                    </div>

                    <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-none">
                        {/* Нижний шар */}
                        {snowmanParts.includes('bottom') && (
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2
                            w-[70%] aspect-square max-w-[80px] md:max-w-[180px]
                            bg-white rounded-full shadow-2xl border-4 border-sky-100
                            animate-in fade-in slide-in-from-bottom duration-700">
                                <div className="absolute inset-4 bg-gradient-to-t from-sky-100/30 to-transparent rounded-full"></div>
                            </div>
                        )}

                        {/* Средний шар */}
                        {snowmanParts.includes('middle') && (
                            <div className="absolute bottom-8 md:bottom-24 left-1/2 -translate-x-1/2
                            w-[55%] aspect-square max-w-[60px] md:max-w-[140px]
                            bg-white rounded-full shadow-2xl border-4 border-sky-100
                            animate-in fade-in duration-700 delay-300">
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full shadow-lg"></div>
                                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full shadow-lg"></div>
                            </div>
                        )}

                        {/* Голова */}
                        {snowmanParts.includes('head') && (
                            <div className="absolute bottom-20 md:bottom-44 left-1/2 -translate-x-1/2
                            w-[42%] aspect-square max-w-[50px] md:max-w-[110px]
                            bg-white rounded-full shadow-2xl border-4 border-sky-100
                            animate-in fade-in slide-in-from-top duration-700 delay-500">
                                {/* Глаза */}
                                <div className="absolute top-3 left-2 lg:top-6 lg:left-4 w-3 h-3 lg:w-4 lg:h-4 bg-black rounded-full"></div>
                                <div className="absolute top-3 right-2 lg:top-6 lg:right-4 w-3 h-3 lg:w-4 lg:h-4 bg-black rounded-full"></div>
                                {/* Нос-морковка */}
                                <div className="absolute top-10 left-1/2 -translate-x-1/2
                                w-0 h-0 hidden lg:flex
                                border-l-[10px] border-l-orange-500
                                border-y-[10px] border-y-transparent"></div>
                                {/* Улыбка */}
                                <div className="absolute hidden lg:flex top-16 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className="w-3 h-3  bg-gray-800 rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Шляпа */}
                        {snowmanParts.includes('hat') && (
                            <div className="absolute bottom-30 md:bottom-66 left-1/2 -translate-x-1/2">
                                <div className="w-10 md:w-20 h-12 bg-black mx-auto -mt-1 shadow-lg"></div>
                                <div className="w-18 md:w-32 h-3 bg-black mx-auto -mt-1 rounded-full shadow-lg"></div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

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
}