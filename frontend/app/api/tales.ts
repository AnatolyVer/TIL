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