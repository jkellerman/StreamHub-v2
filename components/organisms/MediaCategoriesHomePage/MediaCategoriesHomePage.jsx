import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import styles from "../MediaCategoriesHomePage/MediaCategoriesHomePage.module.css";
import CardList from "../../molecules/CardList/CardList";

const MediaCategoriesHomePage = ({ data, category, type }) => {
  return (
    <section className={styles.section}>
      <CategoryHeading category={category} type={type} home />
      <CardList cards={data} />
    </section>
  );
};

export default MediaCategoriesHomePage;
