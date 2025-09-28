import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Track, SpotifyPlaylist} from "@/types/spotify";

interface State {
    deviceId: string | null
    playlist: SpotifyPlaylist | null
    currentTrack: Track | null
    current_duration_ms: number
    isPlaying: boolean
    shuffleMode: boolean
    repeatMode: {
        modes: ["track", "context", "off"]
        current: 'track' | 'context' | 'off'
    }
    volume: number
}
const initialState: State = {
    deviceId: null,
    playlist:  null,
    currentTrack: null,
    current_duration_ms: 0,
    isPlaying: false,
    shuffleMode: false,
    repeatMode: {
        modes: ["track", "context", "off"],
        current: "off"
    },
    volume: 100
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setDeviceID(state, action: PayloadAction<string>) {
            state.deviceId = action.payload
        },
        setTrack(state, action: PayloadAction<Track>) {
            state.currentTrack = action.payload
            state.current_duration_ms = 0
            state.isPlaying = true
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload
        },
        setCurrentDuration(state, action: PayloadAction<number>) {
            state.current_duration_ms = action.payload
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload
        },
        setPlaylist(state, action: PayloadAction<SpotifyPlaylist>) {
            state.playlist = action.payload
        },
        toggleRepeat(state, action: PayloadAction<'track' | 'context' | 'off'>) {
            state.repeatMode.current = action.payload
        },
        toggleShuffle(state) {
            state.shuffleMode = !state.shuffleMode
        },
        setShuffle(state, action: PayloadAction<boolean>) {
            state.shuffleMode = action.payload
        }
    },
})

export const {
    setTrack,
    setCurrentDuration,
    togglePlay,
    setVolume,
    setPlaylist,
    toggleRepeat,
    toggleShuffle,
    setIsPlaying,
    setDeviceID,
    setShuffle,
} = playerSlice.actions

export default playerSlice.reducer
