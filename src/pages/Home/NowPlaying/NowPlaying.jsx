import React from "react";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel, ContentWrapper, SwitchTab } from "../../../components";

const NowPlaying = () => {
  const [media_type, setTime_window] = useState("movie");
  const now_playing = media_type === "movie" ? "now_playing" : "airing_today";
  const { data, loading } = useFetch(`/${media_type}/${now_playing}`);

  const onTabChange = (tab) => {
    setTime_window(tab.toLowerCase());
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Now Playing</span>
        <SwitchTab data={["Movie", "TV"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        time_window={media_type}
        data={data?.results}
        loading={loading}
      />
    </div>
  );
};

export default NowPlaying;
