import styles from "@/components/organisms/TrendingBanner/TrendingBanner.module.css";
import Link from "next/link";
import TrendingCards from "@/components/molecules/TrendingCards/TrendingCards";
import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";

const TrendingBanner = ({ trending, type, category }) => {
  return (
    <section>
      <CategoryHeading type={type} category={category} trending />
      <TrendingCards trending={trending} />
    </section>
  );
};

export default TrendingBanner;
