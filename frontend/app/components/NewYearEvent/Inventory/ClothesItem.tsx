import Image from "next/image";
import React from 'react';

const ClothesItem = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Зимняя одежда&#34;
            </p>
            <div className="flex justify-around items-center">
                <Image
                    src="/gloves.png"
                    width={200}
                    height={200}
                    className="w-1/5"
                    alt="gloves"
                />
                <Image
                    src="/hat.png"
                    width={200}
                    height={200}
                    className="w-1/5"
                    alt="gloves"
                />
                <Image
                    src="/scarf.png"
                    width={200}
                    height={200}
                    className="w-1/5"
                    alt="gloves"
                />
            </div>
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Без этой одежды я замерзну на улице.. Мне ещё снеговика слепить... А почему все красное?&#34;
            </p>
        </div>
    );
};

export default ClothesItem;