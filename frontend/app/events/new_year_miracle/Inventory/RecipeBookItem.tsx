import Image from "next/image";
import React from 'react';

const SnowItem = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                 &#34;Книга рецептов&#34;
            </p>
            <Image
                src="/recipe_book.png"
                width={500}
                height={500}
                className="w-full lg:w-1/3"
                alt="snow"
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;Здесь я найду много рецептов, которые мне понадобятся...&#34;
            </p>
        </div>
    );
};

export default SnowItem;