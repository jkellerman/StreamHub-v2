import { LazyMotion, domAnimation, m } from "framer-motion";
import { useEffect, useState } from "react";
import slugify from "slugify";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRegion } from "@/src/context/regionContext";
import { Results } from "@/types/tmdb";
import { scale } from "@/utils/animations";

import Button from "../Buttons/Buttons";
import Card from "../Card/Card";
import Trailer from "../Dialog/Trailer/Dialog";
import Heading from "../Heading/Heading";
import MediaRunTimeOrSeasons from "../MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import ProgressRating from "../ProgressRating/ProgressRating";
import ReleaseDate from "../ReleaseDate/ReleaseDate";
import Spinner from "../Spinner/Spinner";

import styles from "./MediaGenerator.module.scss";

interface MediaGeneratorProp {
  data: Results | null;
  isLoading: boolean;
  isError: boolean;
  noResults: boolean;
  type: "movie" | "tv";
}

const MediaGenerator: React.FC<MediaGeneratorProp> = ({
  data,
  isLoading,
  isError,
  type,
  noResults,
}) => {
  const { region } = useRegion();

  const [progress, setProgress] = useState(0);

  const voteAverage = data && data.vote_average * 10;
  const isMobile = useMediaQuery(`(max-width: 504px)`); // Needed otherwise progress rating will not load properly in larger screens
  useEffect(() => {
    if (data) {
      setProgress(voteAverage as number);
    }
  }, [voteAverage, data]);

  if (isLoading)
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.noResults}>
          <Spinner />
        </div>
      </div>
    );

  if (isError || noResults)
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.noResults}>there are no results 😕, try something else...</div>
      </div>
    );

  if (data) {
    return (
      <>
        <div className={styles.resultsContainer}>
          <LazyMotion features={domAnimation}>
            <m.div
              className={styles.posterWrapper}
              variants={scale}
              initial="hidden"
              animate="visible"
            >
              <Card
                poster={data.poster_path}
                movieTitle={data.title}
                seriesName={data.name}
                generator
              />
              <div className={styles.posterWrapperDetails}>
                <Heading as="h3" size="s">
                  {type === "movie" ? data.title : data.name}
                </Heading>

                <div className={styles.posterDetailsWrapper}>
                  <ReleaseDate release_date={data.release_date} air_date={data.first_air_date} />
                  <MediaRunTimeOrSeasons runtime={data.runtime} seasons={data.number_of_seasons} />
                  <div className={styles.ratingContainerPost}>
                    {isMobile && (
                      <ProgressRating
                        vote_average={voteAverage ? voteAverage : null}
                        progress={progress}
                        size={60}
                        x="51%"
                        y="50%"
                      />
                    )}
                    <span className={styles.subText}>User Rating</span>
                  </div>
                </div>
              </div>
            </m.div>
          </LazyMotion>

          <div className={styles.results}>
            <div className={styles.headingWrapper}>
              <Heading as="h3" size="s">
                {type === "movie" ? data.title : data.name}
              </Heading>
            </div>
            <div className={styles.detailsWrapper}>
              <ReleaseDate release_date={data.release_date} air_date={data.first_air_date} />
              <MediaRunTimeOrSeasons runtime={data.runtime} seasons={data.number_of_seasons} />
            </div>
            <p className={styles.overview}>{data.overview}</p>
            <div className={styles.optionsContainer}>
              <div className={styles.ctaWrapper}>
                <Button
                  variant="secondary"
                  isFull
                  asLink
                  link={`/${type === "movie" ? "movie" : "show"}/${data.id}/${region}?${slugify(
                    type === "movie" ? (data.title as string) : data.name,
                    { lower: true }
                  )}`}
                >
                  more info
                </Button>
                <Trailer variant="quaternary" endpoint={`/api/details/${type}/${data.id}`} />
              </div>
              <div className={styles.ratingContainer}>
                <ProgressRating
                  vote_average={voteAverage ? voteAverage : null}
                  progress={progress}
                  size={70}
                />
                <span className={styles.subText}>User Rating</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.noResults}>
        {type === "movie" ? "Your movie awaits..." : "Your series awaits..."}
      </div>
    </div>
  );
};

export default MediaGenerator;
