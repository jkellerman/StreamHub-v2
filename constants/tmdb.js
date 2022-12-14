export const BASE_TMDB_URL = "https://api.themoviedb.org/3";

export const BASE_TMDB_QUERY_PARAMS = {
  api_key: process.env.API_KEY,
  language: "en-GB",
  sort_by: "popularity.desc",
};
