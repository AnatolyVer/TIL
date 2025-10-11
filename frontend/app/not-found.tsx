import Link from 'next/link'
import Image from "next/image";
import React from "react";

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-72px)] flex flex-col items-center justify-center w-full">

            <Image
                src="/sakura.png"
                alt="corner"
                width={1000}
                height={1000}
                className="object-cover h-1/2 w-fit flex 2xl:h-3/5 z-50"
                priority
            />
            <br/>
            <h1 className="text-2xl text-center font-bold leading-tight">
                Даже у подарка есть границы. Временные... Попробуй позже
            </h1>
            <Link href="/">
                <button className="mt-6 w-48 px-4 py-2 cursor-pointer text-white rounded bg-pink-500 hover:bg-pink-600 transition-colors">
                    На главную
                </button>
            </Link>
        </div>
    )
}