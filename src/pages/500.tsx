import Head from "next/head";
import { useRouter } from "next/router";

const Custom500 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>500 - Server-side error occurred | Reelgood</title>
      </Head>
      <main>
        <h1>Currently unavailable</h1>
        <button onClick={() => router.back()} style={{ marginLeft: "1rem" }}>
          Go back
        </button>
      </main>
    </>
  );
};

export default Custom500;
