"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import EVENTS from "./event_list"

const Page = () => {

    return (
        <div
            className="p-6 grid gap-6
             grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
             auto-rows-[calc((100vh-72px-48px-24px)/2)]"
        >
            {EVENTS.map((event, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center bg-[var(--background)]
                 rounded-lg shadow-lg p-5 hover:scale-105
                 transition-transform duration-300"
                >
                    <Link
                        href={event.link}
                        className="flex flex-col items-center w-full h-full"
                    >
                        <div className="relative w-full flex-1">
                            <Image
                                fill
                                src={event.image}
                                alt={event.name}
                                className="object-contain rounded-md"
                            />
                        </div>
                        <h2
                            className="text-sm mt-4 sm:text-base md:text-lg font-semibold mb-2 text-center leading-tight"
                            style={{ color: 'var(--header-text)' }}
                        >
                            {event.name}
                        </h2>
                        <h2
                            className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-center leading-tight"
                            style={{ color: 'var(--header-text)' }}
                        >
                            {event.duration}
                        </h2>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Page;
