import React, { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import TmdbLogo from "../Logo/Tmdb/TmdbLogo";

import styles from "./MediaRating.module.scss";

interface MediaRatingProps {
  id: number;
  type: string;
}

const MediaRating: React.FC<MediaRatingProps> = ({ id, type }) => {
  const endpoint = `/api/details/${type}/${id}`;
  const { data } = useFetchDetails(endpoint);
  const [progress, setProgress] = useState(0);
  const voteAverage = data && data.vote_average * 10;
  const gradientId = `progress-bar-gradient-${voteAverage}`;

  const size = 75;
  const strokeWidth = 6;

  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  const rating = (number: number): number => {
    const rating = Math.round(number * 10) / 10;
    return rating;
  };

  useEffect(() => {
    if (data) {
      setProgress(voteAverage);
    }
  }, [voteAverage, data]);

  if (!data) {
    return null; // or render a loading state, or fallback content
  }

  return (
    <div className={styles.container}>
      <svg width={size} height={size} viewBox={viewBox}>
        <defs>
          <linearGradient id={gradientId}>
            <stop
              offset="0%"
              stopColor={progress < 50 ? "#ab1c1c" : progress < 75 ? "#93a51c" : "#1ca586"}
            />
            <stop
              offset="100%"
              stopColor={progress < 50 ? "#ab6b1c" : progress < 75 ? "#61a51c" : "  #5eead4"}
            />
          </linearGradient>
        </defs>
        <circle
          fill="none"
          stroke="#000"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          fill="none"
          stroke={`url(#${gradientId})`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash] as unknown as number}
          strokeLinecap="round"
          style={{ transition: "all 0.5s ease-in-out" }}
        />
        <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle">
          <tspan className={styles.rating}>{rating(voteAverage / 10)}</tspan>
        </text>
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle">
          <tspan className={styles.totalValue}>/10</tspan>
        </text>
      </svg>
      <span className={styles.logoContainer}>
        <TmdbLogo />
        user rating
      </span>
    </div>
  );
};

export default MediaRating;
