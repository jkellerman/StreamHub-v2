import { useEffect, useState } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import useFetchDetails from "@/hooks/useFetchDetails";

import Icon from "../../Icon/Icon";
import Overlay from "../../Overlay/Overlay";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";

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
  const [openPlayer, setOpenPlayer] = useState(false);
  const videoPlayerRef = useClickOutside<HTMLDivElement>(() => setOpenPlayer(false));
  const openVideoPlayer = () => {
    setOpenPlayer(true);
  };

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
    return <div className={styles.noTrailer}></div>;
  }

  if (data.videos.results.length === 0 || !link) {
    return <div className={styles.noTrailer}></div>;
  }

  return (
    <>
      {link && (
        <button className={styles.button} onClick={openVideoPlayer}>
          <Icon icon="play" />
          watch trailer
        </button>
      )}
      {openPlayer && (
        <Overlay>
          <VideoPlayer link={link} videoPlayerRef={videoPlayerRef} />
        </Overlay>
      )}
    </>
  );
};

export default Button;
