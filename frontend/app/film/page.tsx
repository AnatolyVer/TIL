'use client';
import React from 'react';
import Image from "next/image";

const Page = () => {
    return (
        <div className="flex flex-col justify-evenly items-center h-[calc(100vh-72px)] relative px-4 sm:px-8">

            <div className="w-3/4 aspect-video relative">
                <iframe
                    className="w-full h-full"
                    src="https://drive.google.com/file/d/1U408Ot-4oGDRDm6Cvl__mUfzxOA9HK8B/preview"
                    tabIndex={0}
                />
            </div>

            <div className="flex flex-col justify-around items-center text-center mt-4 sm:hidden w-full max-w-2xl">
                <h1 className="text-lg md:text-xl lg:text-2xl leading-snug px-2">
                    Место зарезервировано для признания в любви. Лишний раз никогда не будет лишним...
                </h1>

                <div className="mt-4 w-2/3 sm:hidden relative">
                    <Image
                        src="/sakura.png"
                        alt="corner"
                        width={1000}
                        height={1000}
                        className="w-full h-auto rounded-lg object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
