import api from "./api";
import {NewYearEventState} from "@/lib/newYearEventSlice";

export async function getConfig() {
    const response = await api.get('/new_year');
    return response.data;
}

export async function updateConfig(configChanges: NewYearEventState) {
    const response = await api.post('/new_year', configChanges);
    return response.data;
}