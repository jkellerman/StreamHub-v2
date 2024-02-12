import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRouter } from "next/router";

import Icon from "@/components/Icon/Icon";
import { countryFlags } from "@/constants/app";
import { useRegion } from "@/src/context/regionContext";
import { Types } from "@/types/types";

import styles from "./Dropdown.module.scss";

interface DropdownProps {
  regions: Types.IRegions[];
}

const Dropdown: React.FC<DropdownProps> = ({ regions }) => {
  const { region, setRegion } = useRegion();
  const router = useRouter();

  const FlagEmoji = (countryFlags as Record<string, string>)[region as string];

  const reloadPage = () => {
    if (router) {
    }
    router.reload();
  };
  return (
    <LazyMotion features={domAnimation}>
      <DropdownMenu.Root>
        <m.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.2,
            },
          }}
        >
          <div className={styles.triggerContainer}>
            <div className={styles.triggerSubheading}>Select country</div>
            <DropdownMenu.Trigger asChild>
              <button className={styles.trigger} aria-label="choose region">
                <span className={styles.triggerFlag}>{FlagEmoji}</span>
                <Icon icon="chevronDown" width="15" height="15" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content sideOffset={2} className={styles.dropdownMenuContent}>
                {regions.map((item, i) => {
                  return (
                    <DropdownMenu.DropdownMenuItem
                      key={i}
                      onClick={() => {
                        setRegion(item.iso_3166_1);
                        item.iso_3166_1 !== region && reloadPage();
                      }}
                      className={
                        item.iso_3166_1 === region
                          ? `${styles.dropdownMenuItem} ${styles.activeRegion}`
                          : `${styles.dropdownMenuItem} `
                      }
                    >
                      {item.native_name}
                      <span className={styles.menuItemFlag}>
                        {(countryFlags as Record<string, string>)[item.iso_3166_1]}
                      </span>
                    </DropdownMenu.DropdownMenuItem>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </div>
        </m.div>
      </DropdownMenu.Root>
    </LazyMotion>
  );
};

export default Dropdown;
