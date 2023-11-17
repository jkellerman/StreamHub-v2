import { useEffect, useState } from "react";
import slugify from "slugify";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Media } from "@/types/media";

import Button from "../Buttons/Buttons";
import Heading from "../Heading/Heading";
import MediaRunTimeOrSeasons from "../MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import Poster from "../Poster/Poster";
import ProgressRating from "../ProgressRating/ProgressRating";
import ReleaseDate from "../ReleaseDate/ReleaseDate";
import Spinner from "../Spinner/Spinner";
import Trailer from "../Trailer/Trailer";

import styles from "./MediaGenerator.module.scss";

interface MediaGeneratorProp {
  data: Media.IMediaItem | null;
  isLoading: boolean;
  isError: boolean;
  type: "movie" | "tv";
}

const MediaGenerator: React.FC<MediaGeneratorProp> = ({ data, isLoading, isError, type }) => {
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
      <div className={styles.container}>
        <div className={styles.noResults}>
          <Spinner />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className={styles.container}>
        <div className={styles.noResults}>Oops nothing here, try again...</div>
      </div>
    );

  if (data) {
    return (
      <>
        <div className={styles.resultsContainer}>
          <div className={styles.posterWrapper}>
            <Poster poster={data.poster_path} title={type === "movie" ? data.title : data.name} />
            <div className={styles.posterWrapperDetails}>
              <Heading as="h3" size="s">
                {type === "movie" ? data.title : data.name}
              </Heading>

              <div className={styles.posterDetailsWrapper}>
                <ReleaseDate release_date={data.release_date} air_date={data.first_air_date} />
                <MediaRunTimeOrSeasons runtime={data.runtime} seasons={data?.number_of_seasons} />
                <div className={styles.ratingContainerPost}>
                  {isMobile && (
                    <ProgressRating
                      vote_average={voteAverage ? voteAverage : null}
                      progress={progress}
                      size={55}
                    />
                  )}
                  <span className={styles.subText}>user rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.results}>
            <div className={styles.headingWrapper}>
              <Heading as="h3" size="s">
                {type === "movie" ? data.title : data.name}
              </Heading>
            </div>
            <div className={styles.detailsWrapper}>
              <ReleaseDate release_date={data.release_date} air_date={data.first_air_date} />
              <MediaRunTimeOrSeasons runtime={data.runtime} seasons={data?.number_of_seasons} />
            </div>
            <p className={styles.overview}>{data.overview}</p>
            <div className={styles.resultsContainer}>
              <div className={styles.ctaWrapper}>
                <Button
                  variant="secondary"
                  isFull
                  asLink
                  link={`/${type === "movie" ? "movie" : "show"}/${data.id}?${slugify(
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
                  size={60}
                />
                <span className={styles.subText}>user rating</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.noResults}>Have a spin...</div>
    </div>
  );
};

export default MediaGenerator;
