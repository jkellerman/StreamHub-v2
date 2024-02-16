import { useRouter } from "next/router";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

import { excludedStrings } from "@/constants/app";

import { Media } from "../types";

interface RegionContextProps {
  children: ReactNode;
}

interface RegionContextValue {
  region: string | null;
  setRegion: (newRegion: string) => void;
  providers: Media.IProvider[];
}

const RegionContext = createContext<RegionContextValue | undefined>(undefined);

export const RegionProvider: React.FC<RegionContextProps> = ({ children }) => {
  const { pathname } = useRouter();
  const [region, setRegion] = useState<string | null>(null);

  const [providers, setProviders] = useState<Media.IProvider[]>([]);

  let mediaType = "";
  if (
    pathname.startsWith("/series") ||
    pathname.startsWith("/watch/series") ||
    pathname.match(/^\/series\/genre\/.*$/) ||
    pathname.match(/^\/series\/network\/.*$/) ||
    pathname.match(/^\/watch\/series\/genre\/.*$/) ||
    pathname.match(/^\/watch\/series\/network\/.*$/)
  ) {
    mediaType = "tv";
  } else if (
    pathname.startsWith("/movies") ||
    pathname.startsWith("/watch/movies") ||
    pathname.match(/^\/movies\/genre\/.*$/) ||
    pathname.match(/^\/movies\/network\/.*$/) ||
    pathname.match(/^\/watch\/movies\/genre\/.*$/) ||
    pathname.match(/^\/watch\/movies\/network\/.*$/)
  ) {
    mediaType = "movie";
  } else if (pathname.match("/")) {
    mediaType = "tv";
  }

  const providersEndpoint = `/api/providers/${mediaType}/${region}`;

  const fetchProviders = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const slicedArr = data?.data.results.slice(0, 17);
      const providers = slicedArr.map(
        ({ provider_id, provider_name, logo_path }: Media.IProvider) => {
          return { provider_id, provider_name, logo_path };
        }
      );

      const removeDuplicateProviders = providers?.filter(
        (provider: Media.IProvider) =>
          !excludedStrings.some((excludedStrings) =>
            provider.provider_name.includes(excludedStrings)
          )
      );

      if (region === "US") {
        // HBO Max has moved to Max and now doesn't show any data.
        const removeHBOMax = removeDuplicateProviders.filter(
          (item: Media.IProvider) => item.provider_id !== 384
        );
        setProviders(removeHBOMax);
      } else {
        setProviders(removeDuplicateProviders);
      }
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  useEffect(() => {
    const key = "region";
    const isKeyInLocalStorage = (key: string) => key in localStorage;

    if (isKeyInLocalStorage(key)) {
      // Key exists, you can now access its value
      const value = localStorage.getItem(key);
      setRegion(value);
    } else {
      setRegion("GB");
    }
  }, []);

  useEffect(() => {
    if (region) {
      localStorage.setItem("region", region);
    }
  }, [region]);

  useEffect(() => {
    if (mediaType) {
      fetchProviders(providersEndpoint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, pathname]);

  const value: RegionContextValue = {
    region,
    setRegion,
    providers,
  };

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
