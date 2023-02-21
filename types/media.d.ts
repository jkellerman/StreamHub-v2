export declare namespace Media {
  export interface IMediaItem {
    id: number;
    backdrop_path: string;
    title: string;
    name: string;
    release_date: string;
    first_air_date: string;
    media_type: string;
  }

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

  export interface IDirectorOrNetwork {
    name: string;
  }

  export interface ICastMember extends IDirectorOrNetwork {
    id: number;
  }

  export interface ICast {
    department: string;
  }

  export interface IProvider {
    provider_id: number;
    logo_path: string;
    provider_name: string;
  }

  export interface IProviderList {
    length: number;
    flatrate: IProvider[];
    link: string;
    buy: IProvider[];
    rent: IProvider[];
  }

  export interface IRecommendations {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }

  export interface IRecommendationsList {
    results: IRecommendations[];
  }
}
