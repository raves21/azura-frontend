export type EpisodeToBeRendered = {
  id: string;
  title: string;
  number: number;
  image: string | null | undefined;
};

export type EpisodeChunk = {
  label: string;
  startEp: number;
  endEp: number;
  episodes: EpisodeToBeRendered[];
};
