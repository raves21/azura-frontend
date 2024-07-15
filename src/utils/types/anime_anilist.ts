
export type MultipleAnimeResponse = {
    currentPage: number,
    hasNextPage: boolean,
    totalPages: number,
    totalResults: number,
    results: AnilistAnime[]
}

export type AnilistAnime = {
    id:            string;
    malId:         number;
    title:         Title;
    image:         string;
    imageHash:     string;
    trailer:       Trailer;
    description:   string;
    status:        string;
    cover:         string;
    coverHash:     string;
    rating:        number;
    releaseDate:   number;
    color:         string | null;
    genres:        string[];
    totalEpisodes: number;
    duration:      number;
    type:          string;
}

export type Title = {
    romaji:        string;
    english:       string;
    native:        string;
    userPreferred: string;
}

export type Trailer = {
    id:            string;
    site:          string;
    thumbnail:     string;
    thumbnailHash: string;
}
