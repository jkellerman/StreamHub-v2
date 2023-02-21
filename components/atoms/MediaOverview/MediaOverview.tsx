import styles from "../MediaOverview/MediaOverview.module.css";
import React, { useState, useRef, useEffect } from "react";

interface MediaOverviewProps {
  hero?: boolean;
  overview: string;
  mediaSummary?: boolean;
}

const MediaOverview: React.FC<MediaOverviewProps> = ({
  hero,
  overview,
  mediaSummary,
}) => {
  const [showToggle, setShowToggle] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const handleToggle = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    if (paragraphRef.current) {
      if (
        paragraphRef.current.scrollHeight > paragraphRef.current.offsetHeight
      ) {
        setShowToggle(true);
      }
    }
  }, []);

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
            <button
              className={styles.readMoreToggle}
              onClick={() => handleToggle()}
            >
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
