"use client";

import React, { useEffect } from "react";
import {fetchToken} from "@/app/api/spotify";

import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    setCurrentDuration,
    setVolume,
    setDeviceID,
    setIsPlaying,
    setTrack,
    setShuffle,
    toggleRepeat
} from "@/lib/playerSlice";
import Controller from "@/app/components/Player/Controller";
import { Slider } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {setVolumePercent} from "@/app/api/spotify";

export let spotifyPlayer: Spotify.Player | null = null; 

export default function Player({setIsPlayerReady, setIsPlayerError}: {setIsPlayerReady: (value: boolean) => void, setIsPlayerError: (value: boolean) => void}) {
    const PlayerState = useAppSelector(state => state.player)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            spotifyPlayer = new window.Spotify.Player({
                name: "This I Love",
                getOAuthToken: async (cb: (token: string) => void) => {
                    try {
                        const token = await fetchToken();
                        cb(token);
                    } catch (error) {
                        console.error('Token fetch error:', error);
                    }
                },
                volume: 0.5,
            }) as Spotify.Player;

            spotifyPlayer.addListener("initialization_error", () => {
                setIsPlayerError(true);
                setIsPlayerReady(true);
            });
            spotifyPlayer.addListener("ready", ({ device_id }) => {
                dispatch(setDeviceID(device_id));
                localStorage.setItem("device_id", device_id);
                const volume = +localStorage.getItem("volume")! || 50
                dispatch(setVolume(volume));
                setVolumePercent(volume)
                setIsPlayerReady(true);
            });

            spotifyPlayer.addListener("player_state_changed", async (state) => {
                if (!state) return;

                dispatch(setTrack({...state.track_window.current_track}));
                dispatch(setCurrentDuration(Math.floor(state.position)));
                dispatch(setIsPlaying(!state.paused));
                dispatch(setShuffle(state.shuffle));
                const repeatModes = ["off", "context", "track"];
                const repeatMode = repeatModes[state.repeat_mode] as "off" | "track" | "context";
                dispatch(toggleRepeat(repeatMode));
            });
            spotifyPlayer.connect();
        };

        return () => {
            document.body.removeChild(script);
            if (spotifyPlayer) {
                spotifyPlayer.removeListener("ready");
                spotifyPlayer.removeListener("initialization_error");
                spotifyPlayer.removeListener("player_state_changed");
                spotifyPlayer.disconnect();
            }
        };
    }, [setIsPlayerError, setIsPlayerReady, dispatch]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (spotifyPlayer && PlayerState.isPlaying) {
            interval = setInterval(async () => {
                const state = await spotifyPlayer?.getCurrentState();
                if (state) {
                    dispatch(setCurrentDuration(state.position))
                }
            }, 200);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [PlayerState.isPlaying, dispatch]);

    const handleVolumeChange = async(_: Event, value: number | number[]) => {
        const volume = value as number;
        localStorage.setItem("volume", String(+value))
        dispatch(setVolume(volume));
        await setVolumePercent(volume)
    };

    return (
    <div
        className="relative border-t-2 flex flex-col lg:flex-row justify-end lg:justify-between items-center w-full h-35 bg-[var(--background)] shadow-lg px-6"
      style={{ background: "var(--background)" }}
    >
        {PlayerState.currentTrack ? (
            <>
                <div className="flex items-center absolute lg:static left-0 ml-5 top-4 lg:justify-start lg:ml-0 w-1/4">
                    <Image
                        src={PlayerState.currentTrack.album.images[0]?.url as string}
                        width={60}
                        height={60}
                        className="rounded w-10 lg:w-20 aspect-square  object-cover"
                        alt="Track cover"
                    />
                    <div className="ml-3 flex flex-col">
                        <h2 className="text-sm sm:text-base font-semibold">{PlayerState.currentTrack.name}</h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-500 truncate">{PlayerState.currentTrack.artists.map(a => a.name).join(", ")}</p>
                    </div>
                </div>
                <Controller/>
                <div className="w-3/5 lg:w-1/4 flex absolute lg:static right-0 top-4 sm items-center mr-5 lg:mr-0 justify-end gap-2 h-1/3">
                    <VolumeUpIcon className="text-sm"/>
                    <div className="w-1/3 flex items-center justify-center">
                        <Slider
                            aria-label="volume-indicator"
                            size="small"
                            value={PlayerState.volume}
                            min={0}
                            step={1}
                            max={100}
                            onChange={handleVolumeChange}
                            sx={(t) => ({
                                color: "var(--header-text)",
                                height: 4,
                                "& .MuiSlider-thumb": {
                                    width: 8,
                                    height: 8,
                                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                                    "&::before": {
                                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                                    },
                                    "&:hover, &.Mui-focusVisible": {
                                        boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                                        ...t.applyStyles("dark", {
                                            boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                                        }),
                                    },
                                    "&.Mui-active": {
                                        width: 20,
                                        height: 20,
                                    },
                                },
                                "& .MuiSlider-rail": {
                                    opacity: 0.28,
                                },
                                ...t.applyStyles("dark", {
                                    color: "#fff",
                                }),
                            })}
                        />
                    </div>
                </div>
            </>
        ) : (
            <div className="w-full text-2xl text-center flex justify-center">
                <h1>Выбери песню, погрузись в историю нашей любви</h1>
            </div>
        )}
    </div>
  );
}
