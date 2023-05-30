import Image from "next/future/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";
import playbutton from "@/public/assets/play-button-arrowhead.svg";

import styles from "./Button.module.scss";

interface ButtonProps {
  endpoint: string;
}

interface IVideoData {
  name: string;
  key: string | null;
}

const Button: React.FC<ButtonProps> = ({ endpoint }) => {
  const { data, isLoading, isError } = useFetchDetails(endpoint);
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.videos.results.length !== 0) {
      const regexPattern = /trailer/i;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const trailer = data.videos.results.find((item: IVideoData) => {
        if (item.name === "Official Trailer") {
          setLink(item.key);
          return;
        }
        if (item.name === "Main Trailer") {
          setLink(item.key);
          return;
        }
        if (item.name === "Official Teaser") {
          setLink(item.key);
          return;
        }
        if (regexPattern.test(item.name)) {
          setLink(item.key);
          return;
        }
      });
    }
  }, [data]);

  if (isLoading || isError) {
    return (
      <button className={styles.button}>
        <Image src={playbutton} alt="play-button-arrowhead" width={17} height={17} />
        Watch trailer
      </button>
    );
  }

  if (data.videos.results.length === 0) {
    return <div className={styles.noTrailer}></div>;
  }
  return (
    <Link href={link ? `https://www.youtube.com/watch?v=${link}` : "#"}>
      <a className={styles.button} target="_blank" rel="noopener noreferrer">
        <Image src={playbutton} alt="play-button-arrowhead" width={17} height={17} />
        watch trailer
      </a>
    </Link>
  );
};

export default Button;
