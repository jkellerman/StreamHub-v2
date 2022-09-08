import styles from "@/components/WatchProviders/WatchProviders.module.css";
import { BASE_URL_IMAGE } from "@/utils/utils";
import Image from "next/image";
import img from "@/public/assets/justWatch.svg";

const WatchProviders = ({ watchProviders }) => {
  return (
    <section className={styles.container}>
      <div className={styles.justWatchLogoContainer}>
        <Image
          src={img}
          alt="just watch logo"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className={styles.providers}>
        {watchProviders.length === 0 && <span>No current providers</span>}
        {watchProviders.flatrate && (
          <div>
            <h3 className={styles.headingMethod}>Stream</h3>
            <div className={styles.icons}>
              {watchProviders.flatrate.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watchProviders.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconContainer}
                  >
                    <Image
                      src={`${BASE_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {watchProviders.buy && (
          <div>
            <h3 className={styles.headingMethod}>Buy</h3>
            <div className={styles.icons}>
              {watchProviders.buy.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watchProviders.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconContainer}
                  >
                    <Image
                      src={`${BASE_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {watchProviders.rent && (
          <div>
            <h3 className={styles.headingMethod}>Rent</h3>
            <div className={styles.icons}>
              {watchProviders.rent.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watchProviders.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconContainer}
                  >
                    <Image
                      src={`${BASE_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WatchProviders;
