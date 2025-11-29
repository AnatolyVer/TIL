import Image from "next/image";
import React from 'react';

const MirrorItem = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Зеркало&#34;
            </p>
            <Image
                src="/mirror.png"
                width={200}
                height={200}
                className="w-1/6 lg:w-1/3"
                alt="mirror"
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Обычное красивое зеркало. Или всё-таки необычное?..&#34;
            </p>
        </div>
    );
};

export default MirrorItem;