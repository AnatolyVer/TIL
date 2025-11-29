import Image from "next/image";
import React from 'react';

const SnowItem = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                Эффект &#34;Снегопад&#34;
            </p>
            <Image
                src="/snow.png"
                width={200}
                height={200}
                className="w-1/5"
                alt="snow"
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Самый важный аттрибут зимы, который задает атмосферу приближения Нового Года&#34;
            </p>
        </div>
    );
};

export default SnowItem;