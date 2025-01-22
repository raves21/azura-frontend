export function getTMDBImageURL(backdropPath: string) {
  return `https://image.tmdb.org/t/p/original/${backdropPath}`;
}

export function getTMDBReleaseYear(releaseDate: string) {
  return releaseDate.split("-")[0]
}