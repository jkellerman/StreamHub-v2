export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/";
export const BACKGROUND_URL_IMAGE = `${BASE_URL_IMAGE}original`;
export const BACKDROP_URL_IMAGE = `${BASE_URL_IMAGE}w780`;
export const LOGO_URL_IMAGE = `${BASE_URL_IMAGE}w92`;
export const POSTER_URL_IMAGE = `${BASE_URL_IMAGE}w300`;

export const BASE_TMDB_URL = "https://api.themoviedb.org/3";

export const BASE_TMDB_QUERY_PARAMS = {
  api_key: process.env.API_KEY,
  language: "en-GB",
  sort_by: "popularity.desc",
};

export const BASE_TMDB_QUERY_SEARCH_PARAMS = {
  api_key: process.env.API_KEY,
  language: "en-GB",
};
