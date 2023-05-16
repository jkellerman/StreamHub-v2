import Head from "next/head";
import Link from "next/link";

import buttonStyles from "@/components/atoms/Buttons/Button.module.scss";
import headingStyles from "@/components/organisms/MediaCategoryHomePage/MediaCategoryHomePage.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | Reelgood</title>
      </Head>
      <main>
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
