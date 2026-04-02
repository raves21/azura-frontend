export type ZencloudResponse = {
  data: ZencloudEpisode[];
  pagination: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
};

export type ZencloudEpisode = {
  access_id: string;
  anilist_id: number;
  audio: string;
  episode: number;
  file_id: string;
  player_url: string;
};
