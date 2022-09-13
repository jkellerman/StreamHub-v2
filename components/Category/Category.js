import useSWRFetch from "hooks/useSWRFetch";
import { useEffect, useState } from "react";
import { sliceArray } from "@/utils/utils";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Category = ({ endpoint, type }) => {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchResults = async () => {
  //     const response = await fetch(`${endpoint}`);
  //     const data = await response.json();
  //     const filteredArr = data.data.results.filter(
  //       (item) => item.backdrop_path !== null
  //     );
  //     const arr = sliceArray(filteredArr, 12);
  //     setCategories(arr);
  //   };
  //   fetchResults();
  // }, [endpoint]);

  const { data, isError } = useSWRFetch(endpoint, type);

  if (!data) {
    return [];
  }
  if (isError) return `An error occured for ${type}`;

  const filteredArr = data.data.results.filter(
    (item) => item.backdrop_path !== null
  );

  const arr = sliceArray(filteredArr, 12);

  return (
    <section>
      <h1>{type}</h1>
      <div className={styles.container}>
        {arr.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
                id={show.id}
                image={show.backdrop_path}
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
              <CardDetails
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
