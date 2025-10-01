"use client";

import React, { useEffect, useState } from "react";
import {fetchPlaylist, playTrack} from "@/app/api/spotify";
import {Artist, Item, SpotifyPlaylist, Track} from "@/types/spotify";
import Player from "@/app/components/Player/Player";
import Image from "next/image";
import {useAppSelector} from "@/lib/hooks";
import {useAppDispatch} from "@/lib/hooks";
import {setCurrentDuration, setPlaylist} from "@/lib/playerSlice";
import Link from "next/link";

export default function Playlist() {
    const dispatch = useAppDispatch();
    const {playlist} = useAppSelector(state => state.player)
    const [loading, setLoading] = useState(true);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isPlayerError, setIsPlayerError] = useState(false);
    const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const playlist: SpotifyPlaylist = await fetchPlaylist();
                dispatch(setPlaylist(playlist));

            } catch (error) {
                console.error("Ошибка при получении плейлиста:", error);
            }
        };
        getPlaylist().finally(() => setLoading(false));
    }, [dispatch]);

    const handlePlay = async (trackToPlay: Track) => {
        if (isPlayerError) {
            window.location.href = "https://open.spotify.com/playlist/00gFeMjI4T3hqOWoImT5CO";
        }
        else{
            dispatch(setCurrentDuration(0))
            const index = playlist!.tracks.items.findIndex(({track}) => track.id === trackToPlay.id)
            const tracks:string[] = [];
            for (const { track } of playlist!.tracks.items) {
                tracks.push(track.uri)
            }
            await playTrack(tracks, index);
        }
    }

    if (loading) return (
        <div className="w-full flex flex-col items-center justify-center py-10">
            <h1 className="text-3xl text-[var(--foreground)] py-10 z-10">
                Загрузка...
            </h1>
            <Image
                src="/sakura.png"
                alt="corner"
                width={1000}
                height={1000}
                className="object-cover h-1/3 w-fit flex z-50"
                priority
            />
        </div>
    );
    if (!playlist) return <p className="text-red-500">Не удалось загрузить плейлист</p>;


    return (
        <>
            <section className="flex flex-col lg:flex-row w-full h-[calc(100vh-212px)] relative">
                <div className="flex flex-col p-4 items-center justify-center h-full w-full lg:w-3/5">
                    <Image
                        src={playlist.images[0]?.url}
                        width={200}
                        height={200}
                        className="rounded-full shadow-lg w-1/2 sm:w-1/3 md:w-1/4 aspect-square"
                        alt={`${playlist.name} album cover`}
                        priority
                        onMouseMove={(e) => setTooltip({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setTooltip(null)}
                    />
                    {tooltip && (
                        <div
                            className="fixed bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-50"
                            style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
                        >
                            Найдено в Pinterest
                        </div>
                    )}
                    <Link
                        href="https://open.spotify.com/playlist/00gFeMjI4T3hqOWoImT5CO?si=b8c35eb3785c45b9"
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mt-5 text-center"
                    >
                        {playlist.name}
                    </Link>
                    <h1 className="text-base hidden sm:flex sm:text-lg md:text-xl lg:text-2xl xl:text-3xl w-full text-center leading-relaxed font-bold italic mt-4">
                        Этот плейлист хранит историю нашей любви. Каждая песня пробуждает воспоминания и эмоции,
                        возвращая нас в те моменты, с которыми она связана. И все они — о любви...
                    </h1>
                </div>

                <div className="overflow-y-auto w-full h-full lg:w-2/5 my-2 px-4 sm:px-6">
                    <ul className={`space-y-3 ${!isPlayerReady && "opacity-25 pointer-events-none"}`}>
                        {playlist.tracks.items.map((item: Item, index: number) => (
                            <li
                                onClick={() => handlePlay(item.track)}
                                key={index}
                                className="flex items-center p-2 sm:p-3 transition-transform duration-200 rounded-lg cursor-pointer active:scale-95 hover:bg-[var(--hover-bg)] hover:scale-105"
                                style={{ background: "var(--header-bg)" }}
                            >
                                <Image
                                    src={item.track.album.images[0]?.url}
                                    width={48}
                                    height={48}
                                    alt={`${item.track.name} album cover`}
                                    className="rounded sm:w-20 sm:h-20 w-12 h-12 object-cover"
                                    priority
                                />
                                <div className="ml-3 sm:ml-4">
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                                        {item.track.name}
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-500">
                                        {item.track.artists.map((a: Spotify.Entity) => a.name).join(", ")}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


            </section>
            <Player setIsPlayerReady={setIsPlayerReady} setIsPlayerError={setIsPlayerError} />
        </>
    );
}