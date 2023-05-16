import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

import styles from "../MediaOverview/MediaOverview.module.scss";

interface MediaOverviewProps {
  hero?: boolean;
  overview: string;
  mediaSummary?: boolean;
}

const MediaOverview: React.FC<MediaOverviewProps> = ({ hero, overview, mediaSummary }) => {
  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  const handleShowToggle = () => {
    if (paragraphRef.current) {
      if (paragraphRef.current.scrollHeight > paragraphRef.current.offsetHeight) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    }
  };

  useEffect(() => {
    handleShowToggle();
    router.events.on("routeChangeComplete", handleShowToggle);
    return () => {
      router.events.off("routeChangeComplete", handleShowToggle);
    };
  }, [router, overview]);

  const handleToggle = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      {mediaSummary && (
        <div>
          <p
            className={
              !readMore
                ? `${styles.mediaSummaryOverview} ${styles.overview}`
                : `${styles.mediaSummaryOverview} ${styles.overview} ${styles.expand}`
            }
            ref={paragraphRef}
          >
            {overview}
          </p>
          {showToggle && (
            <button className={styles.readMoreToggle} onClick={() => handleToggle()}>
              {!readMore ? "Read more" : "Show Less"}
            </button>
          )}
        </div>
      )}

      {!mediaSummary && (
        <p
          className={
            hero
              ? `${styles.heroOverview} ${styles.overview}`
              : `${styles.mediaDetailsTabOverview} ${styles.overview}`
          }
        >
          {overview}
        </p>
      )}
    </>
  );
};

export default MediaOverview;
