export type WatchList = WatchListItem[];

export interface WatchListItem {
    _id: string;
    name: string;
    type: string;
    created_at: number;
    status: "wish" | "in_progress" | "done"
}


export type WatchListBlock = {
    [key in "wish" | "in_progress" | "done"]: WatchList;
};