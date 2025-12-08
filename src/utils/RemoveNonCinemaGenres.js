export default function removeNonCinemaGenres(genres) {
  if (!Array.isArray(genres)) return []; // FIX: tránh crash

  return genres.filter(
    (genre) =>
      genre !== "TV Movie" &&
      genre !== "Documentary" &&
      genre !== "News" &&
      genre !== "Reality" &&
      genre !== "Talk"
  );
}
