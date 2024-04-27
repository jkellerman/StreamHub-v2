import { LazyMotion, domAnimation, m } from "framer-motion";

import ContentProviders from "@/components/ContentProviders/GeneratorPage/ContentProviders";
import styles from "@/components/Panel/Panel.module.scss";
import { Media } from "@/types/media";
import { opacity } from "@/utils/animations";

import Button from "../Buttons/Buttons";
import Content from "../Content/Content";
import Dropdown, { DropdownsInnerContainer, DropdownsContainer } from "../Dropdown/Dropdown";
import Heading from "../Heading/Heading";
import MediaGenerator from "../MediaGenerator/MediaGenerator";
import { Panel, PanelInner } from "../Panel/Panel";

interface GeneratorPageProps {
  selectedGenre: Media.IGenre;
  genreList: Media.IGenre[];
  selectedNetwork: Media.IServices;
  networkList: Media.IServices[];
  fetchRecommendation: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  data: null;
  storedSeriesData?: Media.IMediaItem | null;
  storedMovieData?: Media.IMediaItem | null;
  noResults: boolean;
  mediaType: string;
}

const GeneratorPage: React.FC<GeneratorPageProps> = ({
  selectedGenre,
  genreList,
  selectedNetwork,
  networkList,
  fetchRecommendation,
  isLoading,
  isError,
  data,
  storedSeriesData,
  storedMovieData,
  noResults,
  mediaType,
}) => {
  return (
    <>
      <div className={styles.outerWrapper}>
        <LazyMotion features={domAnimation}>
          <m.div className={styles.container} variants={opacity} initial="hidden" animate="visible">
            <Heading as="h1" size="m">
              Get a random pick for tonight
            </Heading>
            <div className={styles.contentWrapper}>
              <Content>
                Cut through streaming indecision! Use the generator below to get something to watch
                tonight on your favourite streaming service.
              </Content>
              <ContentProviders />
            </div>

            <DropdownsInnerContainer>
              <Heading as="h2" size="s">
                Select preferences:
              </Heading>
              <DropdownsContainer>
                <Dropdown
                  generator
                  type={mediaType}
                  media={mediaType}
                  variant="media"
                  style="secondary"
                />
              </DropdownsContainer>

              <DropdownsContainer>
                <Dropdown
                  generator
                  type={mediaType}
                  selected_genre={selectedGenre}
                  genre_list={genreList}
                  variant="genre"
                  style="secondary"
                  selected_network={selectedNetwork}
                />
              </DropdownsContainer>

              <DropdownsContainer>
                <Dropdown
                  generator
                  type={mediaType}
                  selected_network={selectedNetwork}
                  network_list={networkList as Media.IProvider[]}
                  variant="service"
                  style="secondary"
                  selected_genre={selectedGenre}
                />
              </DropdownsContainer>
            </DropdownsInnerContainer>

            <Panel>
              <PanelInner>
                <Heading as="h2" size="s">
                  Suggest a {mediaType === "series" ? "series" : "movie"}
                </Heading>
                <Content>
                  Select your {mediaType === "series" ? "show" : "movie"} preferences using the
                  options above, have a spin and get a random{" "}
                  {mediaType === "series" ? "show" : "movie"} to watch to tonight.
                </Content>

                <Button variant="primary" isFull onClick={fetchRecommendation} disabled={isLoading}>
                  {data ? "SPIN AGAIN" : "SPIN"}
                </Button>
              </PanelInner>

              <MediaGenerator
                data={storedSeriesData ?? storedMovieData ?? null}
                isLoading={isLoading}
                isError={isError}
                type={mediaType === "series" ? "tv" : "movie"}
                noResults={noResults}
              />
            </Panel>
          </m.div>
        </LazyMotion>
        <div className={styles.overlay}></div>
      </div>
    </>
  );
};

export default GeneratorPage;
