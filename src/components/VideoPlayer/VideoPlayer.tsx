import YouTube from "react-youtube";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./VideoPlayer.module.scss";

interface VideoPlayerProps {
  link: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ link }) => {
  const isMobile = useMediaQuery(`(max-width: 480px)`);
  const videoHeight = isMobile ? "195" : "390";
  const videoWidth = isMobile ? "320" : "640";
  const opts = {
    height: videoHeight,
    width: videoWidth,
  };
  return (
    <div className={styles.videoPlayer}>
      <YouTube videoId={link as string} opts={opts} />
    </div>
  );
};

export default VideoPlayer;
