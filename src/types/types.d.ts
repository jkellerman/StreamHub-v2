export declare namespace Types {
  export interface Children {
    children?: React.ReactNode;
  }

  export interface IRegions {
    english_name: string;
    iso_3166_1: string;
    native_name: string;
  }
  export interface IPrimaryRegions {
    english_name: string;
    iso_3166_1: string;
    native_name: string;
    flag: "flagUK" | "flagUS";
  }
}
