import React from "react";
import styles from "../WatchProvidersTab/WatchProvidersTab.module.css";
import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import { Media } from "types";

import Image from "next/future/image";
import JustWatchLogo from "@/components/atoms/JustWatchLogo/JustWatchLogo";
const LOGO_SIZE = 40;

interface WatchProvidersTabProps {
  watch_providers: Media.IProviderList;
  activeTab: string;
}

const WatchProvidersTab: React.FC<WatchProvidersTabProps> = ({
  watch_providers,
  activeTab,
}) => {
  return (
    <div
      className={
        activeTab === "watch"
          ? `${styles.container} ${styles.active}`
          : undefined
      }
    >
      <JustWatchLogo tab />
      <div className={styles.providers}>
        {watch_providers.length === 0 && (
          <span>Not available to watch online</span>
        )}
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
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {watch_providers.buy && (
          <div>
            <h2 className={styles.headingMethod}>Buy</h2>
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
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
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
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchProvidersTab;
