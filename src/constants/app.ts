import { Genres, Media } from "@/src/types";

export const DEFAULT_MOVIES_GENRE: Genres.IGenre = {
  id: 1,
  name: "Popular",
};

export const DEFAULT_SERIES_GENRE: Genres.IGenre = {
  id: 1,
  name: "Popular",
};
export const DEFAULT_SERVICES: Media.IServices = {
  provider_id: 1,
  provider_name: "All services",
};

// Dates

export const formattedDate = (year: number, month: string, day: string): string => {
  return year + "-" + month + "-" + day;
};
export const formattedDateOneYearAgo = (year: number, month: number, day: string): string => {
  return year + "-" + month + "-" + day;
};
