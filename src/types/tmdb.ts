export interface Certification {
  certification: string;
}

export interface CountryProviders {
  link: string;
  buy: Provider[];
  flatrate: Provider[];
  rent: Provider[];
  free: Provider[];
}

export interface Details {
  backdrop_path: string;
  content_ratings: {
    results: {
      iso_3166_1: string;
      rating: string;
    }[];
  };
  credits: {
    cast: MediaId[];
    crew: {
      department: string;
      name: string;
    }[];
  };
  first_air_date: string;
  genres: MediaId[];
  id: number;
  name: string;
  networks: {
    name: string;
  }[];
  number_of_seasons: number;
  origin_country: string[];
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  recommendations: List;
  release_date: string;
  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
        release_date: string;
      }[];
    }[];
  };
  runtime?: number;
  seasons?: number;
  title: string;
  videos: {
    results: {
      name: string;
      key: string;
    }[];
  };
  vote_average: number;
  vote_count: number;
  "watch/providers": {
    results: {
      [countryCode: string]: CountryProviders;
    }[];
  };
}

export interface Genres {
  genres: Id[];
}

export interface Id {
  id: number;
  name: string;
}

export interface List {
  page: number;
  results: Results[];
  total_pages: number;
  total_results: number;
}

export interface MediaDetails {
  data: Details;
}

export interface MediaId {
  id: number;
  name: number;
}

export interface MediaList {
  data: List;
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface Region {
  english_name: string;
  iso_3166_1: string;
  native_name: string;
}

export interface Regions {
  results: Region[];
}

export interface Results {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: string[];
  id: number;
  known_for_department: string;
  media_type: string;
  name: string;
  number_of_seasons?: number;
  origin_country: string[];
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime?: number;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface Service {
  provider_id: number;
  provider_name: string;
}

export interface StreamingServices {
  data: {
    results: Provider[];
  };
}

export interface WatchProviders {
  results: Provider[];
}
