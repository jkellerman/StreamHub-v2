import Head from "next/head";
import Link from "next/link";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import headingStyles from "@/components/organisms/MediaCategoryHomePage/MediaCategoryHomePage.module.css";
import buttonStyles from "@/components/atoms/Button/Button.module.css";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | Reelgood</title>
      </Head>
      <main>
        <SearchBar all />
        <h1 className={headingStyles.heading}>404 - Page Not Found</h1>
        <Link href="/" passHref>
          <a className={buttonStyles.button} style={{ marginLeft: "1rem" }}>
            Go home
          </a>
        </Link>
      </main>
    </>
  );
};

export default Custom404;
