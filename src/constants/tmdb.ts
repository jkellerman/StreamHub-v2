export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/";
export const BACKGROUND_URL_IMAGE_XL = `${BASE_URL_IMAGE}original`;
export const BACKGROUND_URL_IMAGE_L = `${BASE_URL_IMAGE}w1280`;
export const BACKGROUND_URL_IMAGE_M = `${BASE_URL_IMAGE}w780`;
export const BACKGROUND_URL_IMAGE_S = `${BASE_URL_IMAGE}w300`;
export const BACKDROP_URL_IMAGE = `${BASE_URL_IMAGE}w780`;
export const LOGO_URL_IMAGE = `${BASE_URL_IMAGE}w92`;
export const POSTER_URL_IMAGE = `${BASE_URL_IMAGE}w342`;
export const POSTER_URL_IMAGE_S = `${BASE_URL_IMAGE}w185`;
export const POSTER_URL_IMAGE_XS = `${BASE_URL_IMAGE}w92`;

export const BASE_TMDB_URL = "https://api.themoviedb.org/3";

export const BASE_TMDB_QUERY_PARAMS = {
  api_key: process.env.API_KEY,
  language: "en-GB",
  sort_by: "popularity.desc",
};

export const BASE_TMDB_QUERY_SEARCH_PARAMS = {
  api_key: process.env.API_KEY,
  language: "en-GB",
  include_adult: "false",
  include_video: "false",
};

export const BASE_TMDB_QUERY_DISCOVER_PARAMS = {
  api_key: process.env.API_KEY,
  language: "en-GB",
};

export const servicesList = [
  {
    provider_id: 0,
    provider_name: "All Services",
  },
  {
    provider_id: 9,
    provider_name: "Amazon Prime Video",
  },
  {
    provider_id: 350,
    provider_name: "Apple TV Plus",
  },
  {
    provider_id: 38,
    provider_name: "BBC iPlayer",
  },
  {
    provider_id: 337,
    provider_name: "Disney Plus",
  },
  {
    provider_id: 8,
    provider_name: "Netflix",
  },
  {
    provider_id: 591,
    provider_name: "Now TV cinema",
  },
  {
    provider_id: 531,
    provider_name: "Paramount Plus",
  },
  {
    provider_id: 29,
    provider_name: "Sky Go",
  },
];
