"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Page = () => {
    const [number, setNumber] = useState<number>(1);
    const [show, setShow] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const max = 14;

    // swipe state
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const minSwipeDistance = 50;

    useEffect(() => {
        if (localStorage.getItem("love_is_number")) {
            const num = +localStorage.getItem("love_is_number")!;
            setNumber(num);
        }
        setShow(true);
    }, []);

    const handleChange = (value: number) => {
        let newNumber = value;
        if (value > max) newNumber = 1;
        else if (value <= 0) newNumber = max;
        setNumber(newNumber);
        localStorage.setItem("love_is_number", newNumber.toString());
    };

    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const downloadImage = async () => {
        const fileName = `valentine_love_is_${number}.png`;
        const url = `/love_is/num${number}.png`;

        try {
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) throw new Error("Failed to fetch image");

            const blob = await res.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(blobUrl);
        } catch (e) {
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    };

    // swipe handlers (reusable)
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (touchStartX === null || touchEndX === null) return;

        const distance = touchStartX - touchEndX;

        if (distance > minSwipeDistance) {
            // swipe left -> next
            handleChange(number + 1);
        } else if (distance < -minSwipeDistance) {
            // swipe right -> prev
            handleChange(number - 1);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-start lg:flex-row lg:items-center h-[calc(100vh-72px)] px-10">
                <div className="lg:h-full w-full lg:w-1/2 flex flex-col pt-5 lg:pt-30 gap-4 items-center">
                    <h1 style={{ color: "var(--header-text)" }} className="text-3xl sm:text-4xl">
                        Love is...
                    </h1>

                    <p className="text-base text-center sm:text-lg lg:text-2xl leading-relaxed">
                        Эта коллекция посвящена дню святого Валентина. 14 февраля - 14 вкладышей в стиле праздника.
                        Наши персонажи, наши увлечения и самое главное - наша любовь...
                    </p>

                    <p className="text-base text-center sm:text-lg lg:text-2xl leading-relaxed">
                        Это первая и не последняя коллекция, ведь впереди нас ждёт целая вечность вместе..
                    </p>

                    <p className="text-base text-center sm:text-lg lg:text-2xl leading-relaxed">Я люблю тебя...</p>

                    <Image
                        src={`/love_is/img.png`}
                        alt="Love is.."
                        width={300}
                        height={300}
                        className="rounded-lg hidden lg:flex object-contain cursor-pointer"
                        priority
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                <div className="h-2/4 mt-4 lg:mt-0 lg:h-full w-full lg:w-1/2 flex flex-col justify-center items-center">
                    {show && (
                        <>
                            <div
                                className="flex justify-center items-center gap-4 w-1/2"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* arrows only on desktop */}
                                <ArrowBackIosIcon className="cursor-pointer hidden lg:flex" onClick={() => handleChange(number - 1)} />

                                <Image
                                    src={`/love_is/num${number}.png`}
                                    alt="Love is.."
                                    width={300}
                                    height={396}
                                    className="rounded-lg lg:h-full object-contain cursor-pointer"
                                    priority
                                    onClick={() => setIsModalOpen(true)}
                                />

                                <ArrowForwardIosIcon className="cursor-pointer hidden lg:flex" onClick={() => handleChange(number + 1)} />
                            </div>
                            <h1 className="text-2xl mb-2">{number}</h1>
                        </>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div
                    onClick={closeModal}
                    className="fixed w-[100vw] h-[calc(100vh-72px)] bottom-0 bg-black/60 backdrop-blur-md flex items-center gap-10 justify-between z-50"
                >
                    {/* left area (arrows on desktop, swipe on mobile) */}
                    <div
                        className="cursor-pointer flex justify-center items-center h-full w-1/10 hover:bg-black/40 hover:backdrop-blur-md hidden lg:flex"
                        onClick={() => handleChange(number - 1)}
                    >
                        <ArrowBackIosIcon />
                    </div>

                    <div
                        className="flex flex-col items-center justify-center"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <Image
                            src={`/love_is/num${number}.png`}
                            alt="Love is.."
                            width={500}
                            height={500}
                            className="rounded-lg object-cover cursor-pointer"
                            priority
                            onClick={downloadImage}
                        />
                        <h1 className="text-2xl mt-2">{number}</h1>
                    </div>

                    <div
                        className="cursor-pointer justify-center items-center h-full w-1/10 hover:bg-black/40 hover:backdrop-blur-md hidden lg:flex"
                        onClick={() => handleChange(number + 1)}
                    >
                        <ArrowForwardIosIcon />
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
