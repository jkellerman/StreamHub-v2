import YouTube from "react-youtube";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./VideoPlayer.module.scss";

interface VideoPlayerProps {
  link: string;
  videoPlayerRef: React.RefObject<HTMLDivElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ link, videoPlayerRef }) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  const videoHeight = isMobile ? "195" : "390";
  const videoWidth = isMobile ? "320" : "640";
  const opts = {
    height: videoHeight,
    width: videoWidth,
  };
  return (
    <div className={styles.videoPlayer} ref={videoPlayerRef}>
      <YouTube videoId={link} opts={opts} />
    </div>
  );
};

export default VideoPlayer;
