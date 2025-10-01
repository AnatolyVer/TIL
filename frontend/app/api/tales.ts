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
    const res = await api.get(`/fairy_tales/${id}/audio}`, {
        responseType: "blob",
    });
    return res.data
}

export async function loadVideoBlob() {
    const res = await api.get(`/film`, {
        responseType: "blob",
    });
    return res.data
}