export function sortReviewsByRating(a, b) {
  if (isNaN(a.rating) && isNaN(b.rating)) {
    return 0;
  }
  if (isNaN(a.rating)) {
    return 1;
  }
  if (isNaN(b.rating)) {
    return -1;
  }

  return b.rating - a.rating;
}

export function sortReviewsByCreatedAt(a, b) {
  return b.createdAt.seconds - a.createdAt.seconds;
}
