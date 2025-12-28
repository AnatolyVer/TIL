import React, {ReactNode} from 'react';
import First from "@/app/components/NewYearEvent/RewardsModal/1st";
import Second from "@/app/components/NewYearEvent/RewardsModal/2nd";
import Third from "@/app/components/NewYearEvent/RewardsModal/3rd";
import Modal4 from "@/app/components/NewYearEvent/RewardsModal/4th";
import Modal5 from "@/app/components/NewYearEvent/RewardsModal/5th";
import Modal6 from "@/app/components/NewYearEvent/RewardsModal/6th";
import Modal7 from "@/app/components/NewYearEvent/RewardsModal/7th";
import Modal8 from "@/app/components/NewYearEvent/RewardsModal/8th";
import Modal9 from "@/app/components/NewYearEvent/RewardsModal/9th";
import Modal10 from "@/app/components/NewYearEvent/RewardsModal/10th";
import Modal11 from "@/app/components/NewYearEvent/RewardsModal/11th";
import Modal12 from "@/app/components/NewYearEvent/RewardsModal/12th";
import Modal13 from "@/app/components/NewYearEvent/RewardsModal/13th"
import Modal14 from "@/app/components/NewYearEvent/RewardsModal/14th";
import Modal15 from "@/app/components/NewYearEvent/RewardsModal/15th";
import Modal16 from "@/app/components/NewYearEvent/RewardsModal/16th";
import Modal17 from "@/app/components/NewYearEvent/RewardsModal/17th";
import Modal18 from "@/app/components/NewYearEvent/RewardsModal/18th";
import Modal19 from "@/app/components/NewYearEvent/RewardsModal/19th";
import Modal20 from "@/app/components/NewYearEvent/RewardsModal/20th";
import Modal21 from "@/app/components/NewYearEvent/RewardsModal/21th";
import Modal22 from "@/app/components/NewYearEvent/RewardsModal/22th";
import Modal23 from "@/app/components/NewYearEvent/RewardsModal/23th";
import Modal24 from "@/app/components/NewYearEvent/RewardsModal/24th";
import Modal25 from "@/app/components/NewYearEvent/RewardsModal/25th";
import Modal26 from "@/app/components/NewYearEvent/RewardsModal/26th";
import Modal27 from "@/app/components/NewYearEvent/RewardsModal/27th";
import Modal28 from "@/app/components/NewYearEvent/RewardsModal/28th";
import Modal29 from "@/app/components/NewYearEvent/RewardsModal/29th";
import Modal30 from "@/app/components/NewYearEvent/RewardsModal/30th";
import Modal31 from "@/app/components/NewYearEvent/RewardsModal/31th";
import Fireworks from "@/app/components/NewYearEvent/Inventory/Fireworks";

import {motion} from "framer-motion";


const MainModal = ({selectedDay, setSelectedDay} : {selectedDay: number, setSelectedDay: (day: number | null) => void}) => {
    const modals: Record<number, ReactNode> = {
        1: <First selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        2: <Second selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        3: <Third selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        4: <Modal4 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        5: <Modal5 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        6: <Modal6 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        7: <Modal7 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        8: <Modal8 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        9: <Modal9 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        10: <Modal10 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        11: <Modal11 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        12: <Modal12 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        13: <Modal13 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        14: <Modal14 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        15: <Modal15 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        16: <Modal16 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        17: <Modal17 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        18: <Modal18 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        19: <Modal19 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        20: <Modal20 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        21: <Modal21 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        22: <Modal22 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        23: <Modal23 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        24: <Modal24 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        25: <Modal25 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        26: <Modal26 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        27: <Modal27 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        28: <Modal28 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        29: <Modal29 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        30: <Modal30 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,
        31: <Modal31 selectedDay={selectedDay} setSelectedDay={setSelectedDay} />,

    };
    return ( modals[selectedDay] &&
        <motion.div
            className="fixed w-[100vw] h-[calc(100vh-72px)] bottom-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDay(null)}
        >

            {selectedDay === 31 && <Fireworks />}
            <motion.div
                className="bg-white p-4 rounded-3xl max-w-7xl w-full text-center flex flex-col items-center relative overflow-hidden"
                initial={{ scale: 0.7, y: 120, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl lg:text-2xl font-bold text-pink-700 mb-1">День {selectedDay}</h2>
                { modals[selectedDay]}
            </motion.div>
        </motion.div>
    )
};

export default MainModal;
