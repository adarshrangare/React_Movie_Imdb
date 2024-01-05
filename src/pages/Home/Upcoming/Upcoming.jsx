import React from "react";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel, ContentWrapper, SwitchTab } from "../../../components";

const Upcoming = () => {
  const [media_type, setTime_window] = useState("movie");
  const now_playing = media_type === "movie" ? "upcoming" : "on_the_air";
  const { data, loading } = useFetch(`/${media_type}/${now_playing}`);

  const onTabChange = (tab) => {
    setTime_window(tab.toLowerCase());
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">{media_type == "tv" ? "On the Air" : "New Releases"}  </span>
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

export default Upcoming;
