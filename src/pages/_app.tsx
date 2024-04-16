import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import "@/styles/globals.scss";

import { RegionProvider } from "../context/regionContext";
import CoreLayout from "../layouts/core";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RegionProvider>
          <CoreLayout>
            <NextTopLoader color="var(--primary-light)" height={2} />
            <Component {...pageProps} />
          </CoreLayout>
          <ReactQueryDevtools />
        </RegionProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
