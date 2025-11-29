import Image from "next/image";
import React from 'react';

const SockItem = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Носок для подарка&#34;
            </p>
            <Image
                src="/sock.png"
                width={400}
                height={400}
                className="w-1/2"
                alt="sock"
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Каждый год появляется в середине декабря. И снова красный цвет...&#34;
            </p>
        </div>
    );
};

export default SockItem;