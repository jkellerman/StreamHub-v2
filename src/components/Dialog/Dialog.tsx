import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";

import { countryFlags } from "@/constants/app";
import { Types } from "@/types/types";

import AutoComplete from "../AutoComplete/AutoComplete";
import Icon from "../Icon/Icon";

import styles from "./Dialog.module.scss";
interface SelectMenuProps {
  regions: Types.IRegions[];
  id: number;
  title: string;
  type: "movie" | "show";
}

export const RegionDialog: React.FC<SelectMenuProps> = ({ regions, id, title, type }) => {
  const [open, setOpen] = useState(false);

  const { query } = useRouter();

  const slug = query.slugs;

  const region = slug && slug[1];

  const selectedRegion = regions.find((item) => item.iso_3166_1 === region);
  const FlagEmoji = (countryFlags as Record<string, string>)[region as string];

  return (
    <div className={styles.container}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className={styles.triggerContainer}>
          <Dialog.Trigger className={styles.trigger}>
            <span>Streaming in:</span>
            <span className={styles.triggerFlag}>{FlagEmoji}</span>
            <Icon icon="chevronDown" height="15" width="15" />
          </Dialog.Trigger>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />

          <Dialog.Content className={styles.content}>
            <div className={styles.contentHeader}>
              <Dialog.Title className={styles.title}>Select Region</Dialog.Title>

              <Dialog.Close className={styles.closeBtn}>
                <Icon icon="close" height="14" width="14" fill="#FFF" />
              </Dialog.Close>
            </div>
            <Dialog.Description className={styles.selectedRegion}>
              <span className={styles.flag}>{FlagEmoji}</span>
              {selectedRegion?.native_name}
            </Dialog.Description>
            <AutoComplete
              regions={regions}
              setOpen={setOpen}
              id={id}
              title={title}
              type={type}
              region={region}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default RegionDialog;
