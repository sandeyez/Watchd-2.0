export function routeActor(router, id) {
  router.push(`/actor/${id}`);
}

export function getActorPicture(profilePath) {
  return profilePath
    ? `https://image.tmdb.org/t/p/w342${profilePath}`
    : "/no_picture.svg";
}
