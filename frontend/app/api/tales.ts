import api from "./api";

export async function fetchTales(){
    const response = await api.get(
        `/fairy_tales`
    );
    return response.data;
}

export async function fetchTale(id: string){
    const response = await api.get(
        `/fairy_tales/${id}`
    );
    return response.data;
}

export async function loadAudioBlob(id: string) {
    return await api.get(`/fairy_tales/${id}/audio`, {
        responseType: "arraybuffer",
    });
}

export async function loadVideoBlob() {
    return await api.get(`/film`, {
        responseType: "arraybuffer",
        headers: { 'Range': 'bytes=0-' },
    });
}