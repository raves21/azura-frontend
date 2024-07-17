export type AnifyAnimeEpisodes = {
    episodes: Episodes;
}

export type Episodes = {
    data:   Data[];
    latest: Latest;
}

export type Data = {
    episodes:   Episode[];
    providerId: string;
}

export type Episode = {
    id:          string;
    img:         null | string;
    title:       string;
    hasDub:      boolean;
    number:      number;
    rating:      number | null;
    isFiller:    boolean;
    updatedAt:   number;
    description: string | null;
}

export type Latest = {
    updatedAt:     number;
    latestTitle:   string;
    latestEpisode: number;
}
