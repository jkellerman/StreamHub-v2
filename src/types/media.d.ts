export declare namespace Media {
  export interface ICertificationMovie {
    certification: string;
  }

  export interface ICertificationMoviesCountries {
    iso_3166_1: string;
    release_dates: ICertificationMovie[];
  }

  export interface ICertificationSeries {
    iso_3166_1: string;
    rating: string;
  }

  export interface IDirector {
    name: string;
  }

  export interface IGenre {
    id: number;
    name: string;
  }

  export interface INetwork {
    name: IDirector[];
  }

  export interface ICastMember extends IDirector {
    id: number;
  }

  export interface ICast {
    department: string;
  }

  export interface IMediaItem {
    id: number;
    poster_path: string;
    title: string;
    name: string;
    release_date: string;
    first_air_date: string;
    media_type: string;
    origin_country: string[];
    vote_average: number;
    overview: string;
    runtime?: number;
    number_of_seasons?: number;
  }

  export interface MediaRunTimeOrSeasonsProps {
    runtime?: number;
    seasons?: number;
  }

  export interface IMovieData {
    backdrop_path: string;
    known_for_department: string;
  }

  export interface IProvider extends IServices {
    logo_path: string;
  }

  export interface IProviderList {
    length: number;
    flatrate: IProvider[];
    buy: IProvider[];
    rent: IProvider[];
    free: IProvider[];
  }

  export interface IRecommendations {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    release_date: string;
  }

  export interface IRecommendationsList {
    results: IRecommendations[];
  }

  export interface IServices {
    provider_id: number;
    provider_name: string;
  }
}
