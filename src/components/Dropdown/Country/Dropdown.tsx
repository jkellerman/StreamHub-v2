import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRouter } from "next/router";

import Icon from "@/components/Icon/Icon";
import { useRegion } from "@/src/context/regionContext";
import { PrimaryRegions } from "@/types/types";

import styles from "./Dropdown.module.scss";

interface DropdownProps {
  regions: PrimaryRegions[];
}

const Dropdown: React.FC<DropdownProps> = ({ regions }) => {
  const { region, setRegion } = useRegion();
  const router = useRouter();

  const reloadPage = (region: string) => {
    if (region === "GB") {
      router.push("/");
    } else if (region === "US") {
      router.push("/US");
    }
  };
  return (
    <LazyMotion features={domAnimation}>
      <DropdownMenu.Root>
        <m.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.2,
            },
          }}
        >
          <div className={styles.triggerContainer}>
            <DropdownMenu.Trigger asChild>
              <button className={styles.trigger} aria-label="choose region">
                {region === "GB" && <Icon icon="flagUK" />}
                {region === "US" && <Icon icon="flagUS" />}
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
                        item.iso_3166_1 !== region && reloadPage(item.iso_3166_1);
                      }}
                      className={
                        item.iso_3166_1 === region
                          ? `${styles.dropdownMenuItem} ${styles.activeRegion}`
                          : `${styles.dropdownMenuItem} `
                      }
                    >
                      {item.native_name}
                      <Icon icon={item.flag} />
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
