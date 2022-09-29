import "../styles/globals.css";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
