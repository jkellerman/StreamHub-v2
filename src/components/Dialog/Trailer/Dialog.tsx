import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import Button from "@/components/Buttons/Buttons";
import Icon from "@/components/Icon/Icon";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

import styles from "./Dialog.module.scss";
interface ButtonProps {
  endpoint: string;
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
}

interface IVideoData {
  name: string;
  key: string | null;
}

const Trailer: React.FC<ButtonProps> = ({ endpoint, variant }) => {
  const { data } = FetchDetails(endpoint);
  const [link, setLink] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data && data.videos && data.videos.results && data.videos.results.length !== 0) {
      const regexPattern = /trailer/i;
      data.videos.results.find((item: IVideoData) => {
        switch (item.name) {
          case "Official Trailer":
          case "Main Trailer":
          case "Official Teaser":
            setLink(item.key);
            break;
          default:
            if (regexPattern.test(item.name)) {
              setLink(item.key);
            }
        }
      });
    }
  }, [data]);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant={variant} isFull>
            {variant !== "quaternary" && <Icon icon="play" />}
            watch trailer
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.content}>
            <Dialog.Close className={styles.closeBtn}>
              <Icon icon="close" height="17" width="17" fill="#FFF" />
            </Dialog.Close>
            <VideoPlayer link={link} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Trailer;
