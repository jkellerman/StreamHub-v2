import Head from "next/head";
import { useRouter } from "next/router";

import buttonStyles from "@/components/atoms/Buttons/Button.module.scss";
import headingStyles from "@/components/organisms/MediaCategoryHomePage/MediaCategoryHomePage.module.scss";

const Custom500 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>500 - Server-side error occurred | Reelgood</title>
      </Head>
      <main>
        <h1 className={headingStyles.heading}>Currently unavailable</h1>
        <button
          onClick={() => router.back()}
          className={buttonStyles.button}
          style={{ marginLeft: "1rem" }}
        >
          Go back
        </button>
      </main>
    </>
  );
};

export default Custom500;
