"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {useAppSelector} from "@/lib/hooks";
import dayjs from "dayjs";
import Link from "next/link";

import MainModal from "@/app/components/NewYearEvent/RewardsModal/mainModal";

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function Page() {
    const config = useAppSelector(state => state.newYearEvent);
    const today = dayjs();
    const MONTH = 11
    const isDecember = today.month() === MONTH;

    const SPECIAL_DAYS: Record<
        number,
        () => boolean
    > = {

        9: () => config.dishes["cookies"] > 0 || config.taken_rewards[9],
        11: () => config.decrypted || config.taken_rewards[11],
        13: () => config.dishes["buns"] > 0 || config.taken_rewards[13],
    };

    const currentDay = isDecember
        ? today.date()
        : today.month() > MONTH
            ? 31
            : 0;
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        if (!pathRef.current) return;

        const path = pathRef.current;
        const totalLength = path.getTotalLength();
        const newPoints: { x: number; y: number }[] = [];

        for (let i = 0; i < DAYS.length; i++) {
            const t = i / (DAYS.length - 1);
            const point = path.getPointAtLength(t * totalLength);
            newPoints.push({ x: point.x, y: point.y });
        }

        setPoints(newPoints);
    }, []);

    return (
        <div className="relative min-h-[300vh] lg:min-h-[280vh] bg-[#222] overflow-hidden flex items-start justify-center">
            <Link href="/miracle/outside" className={`${config.locations.outside ? "" : "hidden"} z-50`}>
                <Image
                    src="/outside.jpg"
                    alt="outside"
                    width={396}
                    height={396}
                    className={`rounded-[50%] aspect-square w-1/3 lg:w-1/6 absolute left-[7%] lg:left-[15%] top-80 lg:top-40 object-cover ${config.locations.outside ? "cursor-pointer" : "opacity-25"}`}
                    priority
                />
            </Link>
            <Link href="/miracle/cooking" className={`${config.taken_rewards[8] ? "" : "hidden"} z-50`}>
                <Image
                    src="/kitchen.jpg"
                    alt="kitchen"
                    width={396}
                    height={396}
                    className={`rounded-[50%] aspect-square w-1/3 lg:w-1/6 absolute right-[4%] lg:right-[15%] top-120 lg:top-110 object-cover ${config.locations.outside ? "cursor-pointer" : "opacity-25"}`}
                    priority
                />
            </Link>
            <Link href="/miracle/room" className={`${config.taken_rewards[17] ? "" : "hidden"} z-50`}>
                <Image
                    src="/room.jpg"
                    alt="room"
                    width={396}
                    height={396}
                    className={`rounded-[50%] aspect-square w-1/3 lg:w-1/6 absolute left-[7%] lg:left-[15%] top-290 lg:top-250 object-cover ${config.locations.outside ? "cursor-pointer" : "opacity-25"}`}
                    priority
                />
            </Link>
            <div className="relative w-full max-w-[800px] mx-auto">

                <motion.h1
                    className="text-center text-4xl font-bold text-white mt-10"
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Новогоднее чудо
                </motion.h1>

                <div className="relative w-full h-[1600px]">
                    <svg
                        viewBox="0 0 400 1600"
                        className="absolute inset-0 w-full h-full overflow-visible"
                    >
                        <motion.path
                            ref={pathRef}
                            d="M200,100
     C220,250 160,400 240,550
     C320,700 400,850 300,1000
     C200,1150 120,1300 240,1450
     C360,1600 450,1750 230,1900"
                            fill="none"
                            stroke="rgba(255,182,193,0.4)"
                            strokeWidth="45"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3.5, ease: "easeInOut" }}
                        />

                        <motion.path
                            d="M200,100
     C220,250 160,400 240,550
     C320,700 400,850 300,1000
     C200,1150 120,1300 240,1450
     C360,1600 450,1750 230,1900"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                            strokeDasharray="20 20"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatDelay: 2 }}
                        />

                        {points.map((point, i) => {
                            const day = DAYS[i];

                            const isDateLocked = day > currentDay && dayjs().month() === MONTH;

                            let lastOpenedDay = 0;
                            for (let d = 1; d <= 31; d++) {
                                if (config.taken_rewards[d]) lastOpenedDay = d;
                            }
                            const nextAvailableDay = lastOpenedDay + 1;

                            const isSpecialDay = SPECIAL_DAYS[day] !== undefined;
                            const isSpecialConditionFailed = isSpecialDay && !SPECIAL_DAYS[day]();

                            const isBlockedBySequence = day > nextAvailableDay;
                            const isLocked = isDateLocked || isBlockedBySequence || isSpecialConditionFailed;

                            const isSpecialLocked = isSpecialDay && isSpecialConditionFailed;

                            const shouldPulse = day === nextAvailableDay && !isDateLocked;

                            return (
                                <motion.g
                                    key={day}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.06 + 1.5, type: "spring", stiffness: 140 }}
                                >
                                    <motion.circle
                                        cx={point.x}
                                        cy={point.y}
                                        r="22"
                                        fill={isLocked ? "#666" : "white"}
                                        stroke={
                                            isDateLocked
                                                ? "#555"
                                                : isBlockedBySequence
                                                    ? "#FFD700"
                                                    : isSpecialLocked
                                                        ? "#ff4444"
                                                        : "rgba(255,105,180,0.8)"
                                        }
                                        strokeWidth={isSpecialLocked || isBlockedBySequence ? "7" : "4"}
                                        className={`cursor-pointer drop-shadow-xl ${
                                            isLocked ? "opacity-70" : ""
                                        } ${isBlockedBySequence || isSpecialLocked ? "animate-pulse" : ""}`}
                                        animate={
                                            shouldPulse
                                                ? { scale: [1, 1.25, 1], transition: { repeat: Infinity, duration: 1.4 } }
                                                : {}
                                        }
                                        whileHover={!isLocked ? { r: 28, strokeWidth: 7 } : {}}
                                        onClick={!isLocked ? () => setSelectedDay(day) : undefined}
                                    >
                                        {isDateLocked && <title>Этот день ещё не наступил</title>}
                                        {isBlockedBySequence && <title>Сначала открой день {day - 1}</title>}
                                        {isSpecialLocked && (
                                            <title>
                                                {day === 9 && "Сначала приготовь овсяное печенье"}
                                                {day === 11 && "Сначала разгадай послание"}
                                                {day === 13 && "Сначала приготовь булочки"}
                                            </title>
                                        )}
                                    </motion.circle>

                                    <text
                                        x={point.x}
                                        y={point.y + 5}
                                        textAnchor="middle"
                                        className={`font-bold text-xl pointer-events-none select-none ${
                                            isLocked ? "fill-gray-400" : "fill-pink-700"
                                        }`}
                                    >
                                        {day}
                                    </text>

                                    {selectedDay === day && !isLocked && (
                                        <motion.circle
                                            cx={point.x}
                                            cy={point.y}
                                            r="0"
                                            fill="rgba(255,182,193,0.45)"
                                            initial={{ r: 0 }}
                                            animate={{ r: 85 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                    )}
                                </motion.g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {selectedDay && <MainModal selectedDay={selectedDay} setSelectedDay={setSelectedDay} />}
        </div>
    );
}
