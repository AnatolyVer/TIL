import Image from "next/image";
import React from 'react';

const RoomLocation = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                Локация &#34;Гостевая комната&#34;
            </p>
            <Image
                src="/room.jpg"
                alt="room"
                width={1000}
                height={1000}
                className={`rounded-[50%] aspect-square w-1/3 lg:w-1/6 object-cover`}
                priority
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Должны же куда-то Дед Мороз и Николай принести мне подарки. Детское наитие... Или же чудо?&#34;
            </p>
        </div>
    );
};

export default RoomLocation;