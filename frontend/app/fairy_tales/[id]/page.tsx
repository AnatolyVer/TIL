'use client';

import React, { useEffect, useRef, useState } from 'react';
import { fetchTale } from '@/app/api/tales';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Slider } from '@mui/material';

interface Tale {
    _id: string;
    name: string;
    img_link: string;
    link: string;
}

const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const Page = () => {
    const [tale, setTale] = useState<Tale | null>(null);
    const params = useParams<{ id: string }>();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        const getTales = async () => {
            const fetchedTale = await fetchTale(params.id);
            setTale(fetchedTale);

            const res = await fetch(`http://localhost:5000/fairy_tales/${fetchedTale._id}/audio`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.onloadedmetadata = () => {
                    setDuration(audioRef.current!.duration);
                    setCanShow(true)
                };
                audioRef.current.ontimeupdate = () => {
                    setCurrentTime(audioRef.current!.currentTime);
                };
            }
        };
        getTales();
    }, [params.id]);

    const handleTogglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handlePositionChange = (_: Event, value: number | number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value as number;
            setCurrentTime(value as number);
        }
    };

    return (
        <>
            {tale && (
                <div key={tale._id} className="flex h-[calc(100vh-72px)] flex-col justify-center items-center">
                    <div className="flex flex-col h-3/4 items-center w-full">
                        <h2 className="text-3xl font-semibold leading-tight mb-10" style={{ color: 'var(--header-text)' }}>
                            {tale.name}
                        </h2>
                        <Image width={1000} height={1000} src={tale.img_link} alt={tale.name} className="object-cover object-center h-1/2 w-fit" />
                        <br />
                        <br />
                        <audio id="player" ref={audioRef} style={{ display: 'none' }} />
                        <div className="w-1/4 flex flex-col items-center justify-center">
                            {canShow ? (<>
                                <div className="relative w-full flex justify-center items-center">
                                    <p className="mr-2 absolute left-0 mt-5">{formatDuration(currentTime)}</p>
                                    {isPlaying ? (
                                        <PauseIcon
                                            className="cursor-pointer"
                                            sx={{
                                                fontSize: 40,
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s',
                                                '&:hover': { transform: 'scale(1.2)' },
                                            }}
                                            onClick={handleTogglePlay}
                                        />
                                    ) : (
                                        <PlayArrowIcon
                                            className="cursor-pointer"
                                            sx={{
                                                fontSize: 40,
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s',
                                                '&:hover': { transform: 'scale(1.2)' },
                                            }}
                                            onClick={handleTogglePlay}
                                        />
                                    )}
                                    <p className="ml-2 absolute right-0 mt-5">{formatDuration(duration)}</p>
                                </div>
                                <div className="w-full">
                                    <Slider
                                        aria-label="time-indicator"
                                        size="small"
                                        value={currentTime}
                                        min={0}
                                        step={1}
                                        max={duration}
                                        onChange={handlePositionChange}
                                        sx={(t) => ({
                                            color: 'var(--header-text)',
                                            height: 4,
                                            '& .MuiSlider-thumb': {
                                                width: 8,
                                                height: 8,
                                                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                                '&::before': {
                                                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                                },
                                                '&:hover, &.Mui-focusVisible': {
                                                    boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                                                    ...t.applyStyles('dark', {
                                                        boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                                                    }),
                                                },
                                                '&.Mui-active': {
                                                    width: 20,
                                                    height: 20,
                                                },
                                            },
                                            '& .MuiSlider-rail': {
                                                opacity: 0.28,
                                            },
                                            ...t.applyStyles('dark', {
                                                color: '#fff',
                                            }),
                                        })}
                                    />
                                </div>
                            </>) : (<h1>Загрузка...</h1>)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;