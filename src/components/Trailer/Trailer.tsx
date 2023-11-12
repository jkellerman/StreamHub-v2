import { useEffect, useState } from "react";

import Button from "@/components/Buttons/Buttons";
import useClickOutside from "@/hooks/useClickOutside";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

import Icon from "../Icon/Icon";
import Overlay from "../Overlay/Overlay";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

import styles from "./Trailer.module.scss";

interface ButtonProps {
  endpoint: string;
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
}

interface IVideoData {
  name: string;
  key: string | null;
}

const Trailer: React.FC<ButtonProps> = ({ endpoint, variant }) => {
  const { data } = FetchDetails(endpoint);
  const [link, setLink] = useState<string | null>(null);
  const [openPlayer, setOpenPlayer] = useState(false);
  const videoPlayerRef = useClickOutside<HTMLDivElement>(() => setOpenPlayer(false));
  const openVideoPlayer = () => {
    setOpenPlayer(true);
  };

  useEffect(() => {
    if (data && data.videos.results.length !== 0) {
      const regexPattern = /trailer/i;
      data.videos.results.find((item: IVideoData) => {
        switch (item.name) {
          case "Official Trailer":
          case "Main Trailer":
          case "Official Teaser":
            setLink(item.key);
            break;
          default:
            if (regexPattern.test(item.name)) {
              setLink(item.key);
            }
        }
      });
    }
  }, [data]);

  return (
    <>
      <div className={styles.buttonWrapper}>
        <Button variant={variant} onClick={openVideoPlayer} isFull>
          {variant !== "quaternary" && <Icon icon="play" />}
          watch trailer
        </Button>
      </div>
      {openPlayer && (
        <Overlay>
          <VideoPlayer link={link} videoPlayerRef={videoPlayerRef} />
        </Overlay>
      )}
    </>
  );
};

export default Trailer;
