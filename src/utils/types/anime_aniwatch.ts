
export interface AniwatchHomeResponse {
    animes:      AniwatchAnime[];
    genres:      string[];
    top10Animes: Top10Animes;
    category:    string;
    currentPage: number;
    hasNextPage: boolean;
    totalPages:  number;
}

export interface AniwatchAnime {
    id:       string;
    name:     string;
    poster:   string;
    duration: string;
    type:     type;
    rating:   null | string;
    episodes: Episodes;
}

export interface Episodes {
    sub: number | null;
    dub: number | null;
}

export type type = "ONA" | "TV (? eps)" | "TV" | null

export interface Top10Animes {
    today: TopAnime[];
    week:  TopAnime[];
    month: TopAnime[];
}

export interface TopAnime {    
    id:       string;
    rank:     number;
    name:     string;
    poster:   string;
    episodes: Episodes;
}
