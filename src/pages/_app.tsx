import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";

import "@/styles/globals.scss";
import Footer from "@/components/molecules/Footer/Footer";
import Nav from "@/components/molecules/Nav/Nav";

import type { AppProps } from "next/app";

// Page loader, progress bar from nprogress

const queryClient = new QueryClient();

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Nav />
        <Component {...pageProps} />
        <Footer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
