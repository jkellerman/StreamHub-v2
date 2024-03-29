import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";

import "@/styles/globals.scss";

import { RegionProvider } from "../context/regionContext";
import CoreLayout from "../layouts/core";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

NProgress.configure({ showSpinner: false }); // Page loader, progress bar from nprogress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RegionProvider>
          <CoreLayout>
            <Component {...pageProps} />
          </CoreLayout>
          <ReactQueryDevtools />
        </RegionProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
