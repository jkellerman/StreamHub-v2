import styles from "./MediaInfoCard.module.scss";

interface MediaInfoCardProps {
  children: React.ReactNode;
}

const MediaInfoCard: React.FC<MediaInfoCardProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MediaInfoCard;
