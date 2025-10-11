"use client";
import React, { useEffect } from 'react';
import { fetchTales } from "@/app/api/tales";
import Image from "next/image";
import Link from "next/link";

export interface Tale {
    _id: string;
    name: string;
    img_link: string;
    link: string;
}

const Page = () => {
    const [tales, setTales] = React.useState<Tale[]>([]);

    useEffect(() => {
        const getTales = async () => {
            const gotTales = await fetchTales();

            setTales(gotTales);
        };

        getTales();
    }, []);

    return (
        <div
            className="p-6 grid gap-6
             grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
             auto-rows-[calc((100vh-72px-48px-24px)/2)]"
        >
            {tales.map((tale, index) => (
                <div
                    key={tale._id + index}
                    className="flex flex-col items-center bg-[var(--background)]
                 rounded-lg shadow-lg p-5 hover:scale-105
                 transition-transform duration-300"
                >
                    <Link
                        href={`/fairy_tales/${tale._id}`}
                        className="flex flex-col items-center w-full h-full"
                    >
                        <h2
                            className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-center leading-tight"
                            style={{ color: 'var(--header-text)' }}
                        >
                            {tale.name}
                        </h2>
                        <div className="relative w-full flex-1">
                            <Image
                                fill
                                src={tale.img_link}
                                alt={tale.name}
                                className="object-contain rounded-md"
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Page;
