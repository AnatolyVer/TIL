import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Slider } from "@mui/material";
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import {
    setCurrentDuration, setShuffle, togglePlay,
    toggleRepeat,
    toggleShuffle
} from "@/lib/playerSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {spotifyPlayer} from "@/app/components/Player/Player";
import {setRepeatMode, setShuffleMode} from "@/app/api/spotify";
import {useEffect} from "react";

export function formatDuration(value: number) {
    const seconds = Math.floor(value / 1000);
    const minute = Math.floor(seconds / 60);
    const secondLeft = seconds - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

const Controller = () => {
    const PlayerState = useAppSelector(state => state.player)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const repeatModeLocal = localStorage.getItem("repeatMode");

        const repeatMode =
            repeatModeLocal === 'track' || repeatModeLocal === 'context' || repeatModeLocal === 'off'
                ? repeatModeLocal
                : 'off';

        dispatch(toggleRepeat(repeatMode));
        setRepeatMode(repeatMode)

        const shuffleModeLocal = localStorage.getItem("shuffleMode") === "true";
        dispatch(setShuffle(shuffleModeLocal));
        setShuffleMode(shuffleModeLocal);
    }, [dispatch]);

    const handleTogglePlay = () => {
        if (!PlayerState.isPlaying) spotifyPlayer?.resume()
        else spotifyPlayer?.pause()
        dispatch(togglePlay())
    }

    const handlePositionChange = (_: Event, value: number | number[]) => {
        if (!spotifyPlayer) return;
        const positionMs = value as number;
        spotifyPlayer.seek(positionMs);
        dispatch(setCurrentDuration(positionMs));
    };

    const prevTrack = async () => {
        if (!spotifyPlayer) return;
        await spotifyPlayer.previousTrack();
    }

    const nextTrack = async () => {
        if (!spotifyPlayer) return;
        await spotifyPlayer.nextTrack()
    }

    const handleRepeat = async () => {
        const pos = PlayerState.repeatMode.modes.indexOf(PlayerState.repeatMode.current)
        const newPos = pos == 2 ? 0 : pos+1
        const newMode = PlayerState.repeatMode.modes[newPos]
        localStorage.setItem("repeatMode", newMode)
        dispatch(toggleRepeat(newMode))
        await setRepeatMode(newMode)
    }

    const handleShuffle = async () => {
        dispatch(toggleShuffle())
        const updatedShuffleMod = !PlayerState.shuffleMode
        await setShuffleMode(updatedShuffleMod);
        localStorage.setItem("shuffleMode", updatedShuffleMod ? "true" : "false");
    }

    return (
        <div className="w-3/4 lg:w-1/2 flex flex-col lg:self-end items-center justify-center lg:mt-0">
            <div className="flex gap-5 w-full justify-center items-center relative">
                <p className="absolute left-0 mt-9">{formatDuration(PlayerState.current_duration_ms)}</p>
                <ShuffleIcon
                    className="cursor-pointer"
                    sx={{
                        cursor: 'pointer',
                        fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                        color: PlayerState.shuffleMode ? "var(--header-text)" : "white",
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    onClick={handleShuffle}
                />
                <SkipPreviousIcon
                    className="cursor-pointer"
                    sx={{
                        cursor: 'pointer',
                        fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    onClick={prevTrack}
                />
                {PlayerState.isPlaying ? (
                    <PauseIcon
                        className="cursor-pointer"
                        sx={{
                            cursor: 'pointer',
                            fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.2)' },
                        }}
                        onClick={handleTogglePlay}
                    />
                ) : (
                    <PlayArrowIcon
                        className="cursor-pointer"
                        sx={{
                            cursor: 'pointer',
                            fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.2)' },
                        }}
                        onClick={handleTogglePlay}
                    />
                )}
                <SkipNextIcon
                    className="cursor-pointer"
                    sx={{
                        cursor: 'pointer',
                        fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    onClick={nextTrack}
                />
                {PlayerState.repeatMode.current === "off" ? (
                    <RepeatIcon
                        className="cursor-pointer"
                        sx={{
                            cursor: 'pointer',
                            fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.2)' },
                        }}
                        onClick={handleRepeat}
                    />
                ) : (
                    PlayerState.repeatMode.current === "track" ? (
                        <RepeatOneIcon
                            className="cursor-pointer"
                            sx={{
                                color: "var(--header-text)",
                                cursor: 'pointer',
                                fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.2)' },
                            }}
                            onClick={handleRepeat}
                        />
                    ) : (
                        <RepeatIcon
                            className="cursor-pointer"
                            sx={{
                                color: "var(--header-text)",
                                cursor: 'pointer',
                                fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30, xxl: 40 },
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.2)' },
                            }}
                            onClick={handleRepeat}
                        />
                    )
                )}
                <p className="ml-2 absolute right-0 mt-9">{formatDuration(PlayerState.currentTrack!.duration_ms)}</p>
            </div>
            <div className="flex justify-center w-full relative">
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={PlayerState.current_duration_ms}
                    min={0}
                    step={1}
                    max={PlayerState.currentTrack!.duration_ms}
                    onChange={handlePositionChange}
                    sx={(t) => ({
                        color: "var(--header-text)",
                        height: 4,
                        padding: "0 0 40px 0",
                        "& .MuiSlider-track": {
                            height: 4,
                        },
                        "& .MuiSlider-thumb": {
                            width: 8,
                            height: 8,
                            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                            "&::before": {
                                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                            },
                            "&:hover, &.Mui-focusVisible": {
                                boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                                ...t.applyStyles("dark", {
                                    boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
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
    );
};

export default Controller;