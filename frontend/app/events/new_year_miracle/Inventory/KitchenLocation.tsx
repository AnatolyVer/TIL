import Image from "next/image";
import React from 'react';

const OutsideLocation = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                Локация &#34;Кухня&#34;
            </p>
            <Image
                src="/kitchen.jpg"
                alt="kitchen"
                width={500}
                height={500}
                className={`rounded-[50%] aspect-square w-1/2 lg:w-1/4 object-cover`}
                priority
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Главное во время готовки не порезаться и не обжечься...&#34;
            </p>
        </div>
    );
};

export default OutsideLocation;