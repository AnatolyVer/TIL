import api from "./api";
import axios from "axios";

export async function fetchPlaylist() {
    const response = await api.get(
        "/spotify/playlist/00gFeMjI4T3hqOWoImT5CO"
    );
    return response.data;
}
export async function fetchToken(){
    const response = await api.get(
        `/spotify/getToken`
    );
    return response.data;
}

export async function playTrack(trackUris: string[], startIndex = 0, ms?: number) {
    const deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
        throw new Error("Device ID not found");
    }

    const body: { uris: string[]; offset: { position: number }; position_ms?: number } = {
        uris: trackUris,
        offset: { position: startIndex },
    };

    if (ms !== undefined) {
        body.position_ms = ms;
    }

    await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        body,
        {
            headers: {
                Authorization: `Bearer ${await fetchToken()}`,
                "Content-Type": "application/json",
            },
        }
    );
}


export async function setRepeatMode(state: string) {
    const deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
        throw new Error("Device ID not found");
    }
    await axios.put(
        `https://api.spotify.com/v1/me/player/repeat?state=${state}&device_id=${deviceId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${await fetchToken()}`,
                "Content-Type": "application/json",
            },
        }
    );
}

export async function setShuffleMode(state: boolean) {
    const deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
        throw new Error("Device ID not found");
    }
    await axios.put(
        `https://api.spotify.com/v1/me/player/shuffle?state=${state}&device_id=${deviceId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${await fetchToken()}`,
                "Content-Type": "application/json",
            },
        }
    );
}

export async function setVolumePercent(volume_percent: number) {
    const deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
        throw new Error("Device ID not found");
    }
    await axios.put(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume_percent}&device_id=${deviceId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${await fetchToken()}`,
                "Content-Type": "application/json",
            },
        }
    );
}
