import styles from "@/components/WatchProvidersTab/WatchProvidersTab.module.css";
import { LOGO_URL_IMAGE } from "@/utils/utils";
import Image from "next/future/image";
import img from "@/public/assets/justwatch.svg";

const WatchProvidersTab = ({ watch_providers, activeTab }) => {
  return (
    <section
      className={
        activeTab === 1 ? `${styles.container} ${styles.active}` : null
      }
    >
      <div className={styles.justWatchLogoContainer}>
        <Image
          src={img}
          alt="just watch logo"
          unoptimized={true}
          width={100}
          height={50}
          className={styles.logo}
          priority={true}
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
                  >
                    <Image
                      src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      unoptimized={true}
                      className={styles.icon}
                      width={40}
                      height={40}
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
                  >
                    <Image
                      src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      unoptimized={true}
                      className={styles.icon}
                      width={40}
                      height={40}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {watch_providers.rent && (
          <div>
            <h2 className={styles.headingMethod}>Rent</h2>
            <div className={styles.icons}>
              {watch_providers.rent.map((provider) => {
                return (
                  <a
                    key={provider.provider_id}
                    href={watch_providers.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                      alt={provider.provider_name}
                      unoptimized={true}
                      className={styles.icon}
                      width={40}
                      height={40}
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

export default WatchProvidersTab;
