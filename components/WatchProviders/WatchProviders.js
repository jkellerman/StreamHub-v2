import styles from "@/components/WatchProviders/WatchProviders.module.css";
import { BASE_URL_IMAGE } from "@/utils/utils";
import Image from "next/image";
import img from "@/public/assets/justwatch.svg";

const WatchProviders = ({ watch_providers }) => {
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
        {watch_providers.length === 0 && <span>No current providers</span>}
        {watch_providers.flatrate && (
          <div>
            <h2 className={styles.headingMethod}>Stream</h2>
            <div className={styles.icons}>
              {watch_providers.flatrate.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watch_providers.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconContainer}
                  >
                    <Image
                      src={`${BASE_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      layout="fill"
                      objectFit="contain"
                      priority
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {watch_providers.buy && (
          <div>
            <h3 className={styles.headingMethod}>Buy</h3>
            <div className={styles.icons}>
              {watch_providers.buy.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watch_providers.link}
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
        {watch_providers.rent && (
          <div>
            <h3 className={styles.headingMethod}>Rent</h3>
            <div className={styles.icons}>
              {watch_providers.rent.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watch_providers.link}
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
