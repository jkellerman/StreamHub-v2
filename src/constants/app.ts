import { Media } from "@/src/types";

export const defaultGenreName = "Popular";
export const defaultNetworkName = "All Services";
export const defaultWatchGenreName = "All";
export const defaultWatchNetworkName = "Any Service";

export const DEFAULT_GENRE: Media.IGenre = {
  id: 1,
  name: defaultGenreName,
};

export const DEFAULT_NETWORK: Media.IServices = {
  provider_id: 1,
  provider_name: defaultNetworkName,
};
export const DEFAULT_WATCH_GENRE: Media.IGenre = {
  id: 1,
  name: defaultWatchGenreName,
};

export const DEFAULT_WATCH_NETWORK: Media.IServices = {
  provider_id: 1,
  provider_name: defaultWatchNetworkName,
};
