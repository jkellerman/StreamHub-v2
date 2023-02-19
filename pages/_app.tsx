import React from "react";
import "../styles/globals.css";
import Nav from "@/components/molecules/Nav/Nav";
import Footer from "@/components/molecules/Footer/Footer";
import NProgress from "nprogress";
import Router from "next/router";

import type { AppProps } from "next/app";

// Page loader, progress bar from nprogress

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
