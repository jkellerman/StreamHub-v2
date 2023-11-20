import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

import styles from "../MediaOverview/MediaOverview.module.scss";

interface MediaOverviewProps {
  overview: string;
}

const MediaOverview: React.FC<MediaOverviewProps> = ({ overview }) => {
  const [showToggle, setShowToggle] = useState(false);
  const [readMore, setReadMore] = useState(false);
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
      <div className={styles.container}>
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
    </>
  );
};

export default MediaOverview;
