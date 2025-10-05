'use client';
import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {CircularProgress} from "@mui/material";
import {loadVideoBlob} from "@/app/api/tales";

const Page = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFilm = async () => {
            const res = await loadVideoBlob();
            const blob = new Blob([res.data], { type: "video/mp4" });
            const url = URL.createObjectURL(blob);
            if (videoRef.current) {
                videoRef.current.src = url;
                videoRef.current.onloadeddata = () => setLoading(false);
                videoRef.current.onerror = (e) => {
                    console.error('Video error:', e);
                    setLoading(false);
                };
                videoRef.current.load();
            }
        };
        getFilm();
    }, []);

    return (
        <div className="flex flex-col justify-evenly items-center h-[calc(100vh-72px)] relative">
            <Image
                src="/sakura.png"
                alt="corner"
                width={1000}
                height={1000}
                className="fixed hidden 2xl:flex h-fit w-1/5 bottom-0 sm:z-0 right-0 rounded-lg object-cover z-50"
                priority
            />

            <div className="bg-[var(--header-bg)] aspect-video w-3/4 2xl:w-1/2 relative">
                <video
                    className="w-full aspect-video"
                    ref={videoRef}
                    width="800"
                    height="450"
                    controls
                    autoPlay
                />
                <div
                    className={`bg-[var(--header-bg)] justify-center items-center w-full top-0 h-full absolute ${loading ? 'flex' : 'hidden'}`}
                >
                    <CircularProgress color="inherit" />
                </div>
            </div>
            <div className="flex flex-col justify-around items-center sm:hidden text-center ">
                <h1 className="text-xl p-4 sm:text-2xl leading-tight">
                    Место зарезервировано для признания в любви. Лишний раз никогда не будет лишним...
                </h1>
                <br/>
                <Image
                    src="/sakura.png"
                    alt="corner"
                    width={1000}
                    height={1000}
                    className="sm:hidden flex h-fit w-1/3 bottom-0 sm:z-0 right-0 rounded-lg object-cover z-50"
                    priority
                />
            </div>
        </div>
    );
};

export default Page;
