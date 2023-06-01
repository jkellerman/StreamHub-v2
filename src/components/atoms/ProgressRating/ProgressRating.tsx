import styles from "./ProgressRating.module.scss";

interface MediaRatingProps {
  vote_average: number;
  progress: number;
}

const ProgressRating: React.FC<MediaRatingProps> = ({ vote_average, progress }) => {
  const gradientId = `progress-bar-gradient-${vote_average}`;

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

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <defs>
        <linearGradient id={gradientId}>
          <stop
            offset="0%"
            stopColor={progress < 50 ? "#ab1c1c" : progress < 75 ? "#f0df40" : "#1ca586"}
          />
          <stop
            offset="100%"
            stopColor={progress < 50 ? "#ab6b1c" : progress < 75 ? "#8ea51c" : "  #5eead4"}
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
        <tspan className={styles.rating}>
          {vote_average !== 100 ? rating(vote_average / 10).toFixed(1) : rating(vote_average / 10)}
        </tspan>
      </text>
      <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle">
        <tspan className={styles.totalValue}>/10</tspan>
      </text>
    </svg>
  );
};

export default ProgressRating;
