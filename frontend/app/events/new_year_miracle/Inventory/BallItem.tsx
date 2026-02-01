import Image from "next/image";
import React from 'react';

const SnowItem = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-pink-700 italic mb-3 text-sm lg:text-lg">
                &#34;Шарики для ёлки&#34;
            </p>
            <Image
                src="/ball.png"
                width={200}
                height={200}
                className="w-1/5"
                alt="ball"
            />
            <p className="bg-white italic mt-3 text-pink-700 text-sm lg:text-lg rounded-md pointer-events-nonewhitespace-nowrap">
                &#34;С их помощью можно украсить ёлку, ну или дать котику поиграться с ним, как с клубком ниток. <br/>
                Примечание: при наличии домашних животных убедитесь, что ёлка не пострадает&#34;
            </p>
        </div>
    );
};

export default SnowItem;