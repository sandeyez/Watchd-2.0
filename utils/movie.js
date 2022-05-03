export function getReleaseYear(releaseDate) {
  return releaseDate.slice(0, 4);
}

export function formatDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  let result = "";

  hours > 0 ? (result += `${hours}h `) : null;
  result += `${minutes}m`;

  return result;
}

export function routeMovie(router, id) {
  router.push(`/movies/${id}`);
}

export function getMoviePoster(posterPath) {
  return posterPath
    ? `https://image.tmdb.org/t/p/w342${posterPath}`
    : "/no_poster.svg";
}

export function getMovieBackdrop(backdropPath) {
  return backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "/no_banner.svg";
}

export function getActorPicture(profilePath) {
  return profilePath
    ? `https://image.tmdb.org/t/p/w185${profilePath}`
    : "/no_picture.svg";
}

export function getProviderLogo(logoPath) {
  return `https://image.tmdb.org/t/p/w154${logoPath}`;
}
