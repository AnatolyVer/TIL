"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Page = () => {
    const [number, setNumber] = useState<number>(1);
    const [show, setShow] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const max = 14;

    useEffect(() => {
        if (localStorage.getItem("love_is_number"))
        {
            const num = +localStorage.getItem("love_is_number")!
            setNumber(num);
        }
        setShow(true);
    }, []);

    const handleChange = (value: number) => {
        let newNumber = value;
        if (value > max) newNumber = 1
        else if (value <= 0) newNumber = max
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

    return (
        <>
            <div className="flex items-center h-[calc(100vh-72px)]">
                <div className="h-full w-1/2 flex flex-col pt-30 gap-10 items-center">
                    <h1  style={{ color: "var(--header-text)" }} className="text-4xl">Love is...</h1>
                    <p className="text-2xl text-center">
                        Эта коллекция посвящена дню святого Валентина. 14 февраля - 14
                        вкладышей в стиле праздника. Наши персонажи, наши увлечения и самое
                        главное - наша любовь...
                    </p>
                    <p className="text-2xl text-center">
                        Это первая и не последняя коллекция, ведь впереди нас ждёт целая вечность вместе..
                    </p>
                    <p className="text-2xl text-center">
                        Я люблю тебя...
                    </p>
                    <Image
                        src={`/love_is/img.png`}
                        alt="Love is.."
                        width={300}
                        height={300}
                        className="rounded-lg object-cover cursor-pointer"
                        priority
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                <div className="h-full w-1/2 flex flex-col justify-center items-center">
                    {show && <>
                        <div className="flex justify-center items-center gap-4 mt-4 w-1/2">
                            <ArrowBackIosIcon className="cursor-pointer" onClick={() => handleChange(number - 1)}/>
                            <Image
                                src={`/love_is/num${number}.png`}
                                alt="Love is.."
                                width={396}
                                height={396}
                                className="rounded-lg object-cover cursor-pointer"
                                priority
                                onClick={() => setIsModalOpen(true)}
                            />
                            <ArrowForwardIosIcon className="cursor-pointer" onClick={() => handleChange(number + 1)}/>
                        </div>
                        <h1 className="text-2xl mb-2">{number}</h1>
                    </>}
                </div>
            </div>
            {
             isModalOpen && <div onClick={closeModal} className="fixed w-[100vw] h-[calc(100vh-72px)] bottom-0 bg-black/60 backdrop-blur-md flex items-center gap-10 justify-between z-50">
                    <div className="cursor-pointer flex justify-center items-center h-full w-1/10 hover:bg-black/40 hover:backdrop-blur-md" onClick={() => handleChange(number - 1)}>
                        <ArrowBackIosIcon />
                    </div>

                <div className="flex flex-col items-center justify-center">
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
                    <div className="cursor-pointer flex  justify-center items-center h-full w-1/10 hover:bg-black/40 hover:backdrop-blur-md" onClick={() => handleChange(number - 1)}>
                        <ArrowForwardIosIcon  />
                    </div>
                </div>
            }
        </>
    );
};

export default Page;
