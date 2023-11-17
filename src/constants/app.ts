import { Media } from "@/src/types";

export const defaultGenreName = "All Genres";
export const defaultNetworkName = "All Services";
export const defaultWatchNetworkName = "Any Service";

export const DEFAULT_GENRE: Media.IGenre = {
  id: 1,
  name: defaultGenreName,
};

export const DEFAULT_NETWORK: Media.IServices = {
  provider_id: 1,
  provider_name: defaultNetworkName,
};

export const DEFAULT_WATCH_NETWORK: Media.IServices = {
  provider_id: 1,
  provider_name: defaultWatchNetworkName,
};

export const randomPageNumberMovie = 10;
export const randomPageNumberSeries = 5;

export const DATE_SLICE = 4;

export const year = "2023";
