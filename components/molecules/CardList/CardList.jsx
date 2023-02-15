import Card from "@/components/atoms/Card/Card";
import CardDetails from "@/components/molecules/CardDetails/CardDetails";
import styles from "../CardList/CardList.module.css";

import Spinner from "@/components/atoms/Spinner/Spinner";

const CardList = ({ cards, isLoading }) => {
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      {cards.map((item) => {
        return (
          <article key={item.id} className={styles.linkContainer}>
            <Card
              id={item.id}
              image={item.backdrop_path}
              title={item.title}
              seriesName={item.name}
            />
            <CardDetails
              release_date={item.release_date}
              title={item.title}
              air_date={item.first_air_date}
              seriesName={item.name}
            />
          </article>
        );
      })}
    </div>
  );
};

export default CardList;
