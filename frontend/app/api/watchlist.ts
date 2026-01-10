import api from "./api";
import {WatchList, WatchListItem} from "@/types/WatchList";

export async function fetchWatchList(): Promise<WatchList> {
    const response = await api.get(`/watchlist`);
    return response.data;
}

export async function fetchAddItem(item: Partial<WatchListItem>) {
    await api.post(`/watchlist`, item);
}

export async function fetchUpdateItem(id: string, changes: Partial<WatchListItem>) {
    await api.put(`/watchlist/${id}`, changes);
}

export async function fetchDeleteItem(id: string) {
    await api.delete(`/watchlist/${id}`);
}