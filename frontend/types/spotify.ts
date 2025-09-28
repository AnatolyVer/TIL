export interface SpotifyPlaylist {
    collaborative: boolean;
    description?: string;
    external_urls: {
        spotify: string;
    }
    followers: {
        href: null,
        total: number;
    }
    href: string;
    id: string;
    images: Image[]
    name: string;
    owner: Owner;
    primary_color?: string;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks
    type: string;
    uri: string;
}

interface Image {
    height?:number;
    width?:number;
    url: string;
}

interface Owner {
    display_name?: string;
    external_urls: {
        spotify: string;
    }
    href: string;
    id: string;
    type: string;
    url: string;
}

export interface Artist {
    name: string;
    external_urls: {
        spotify: string;
    }
    href: string;
    id: string;
    type: string;
    url: string;
}

interface Tracks {
    href: string;
    limit: number;
    next?:string;
    offset: number;
    previous?:string;
    total: number;
    items: Item[];
}

export interface Item {
    added_at:string;
    added_by:Artist;
    is_local:boolean;
    primary_color?: string;
    track:Track;
    video_thumbnail: {
        url: string;
    };
}

export interface Track {
    album: {
        images: {
            url: string;
        }[];
    }
    artists: Spotify.Entity[];
    duration_ms: number;
    id: string | null;
    name: string;
    uri: string;
}