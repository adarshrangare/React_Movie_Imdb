import React from "react";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel, ContentWrapper, SwitchTab } from "../../../components";

const TopRated = () => {
    
  const [media_type, setTime_window] = useState("movie");

  const { data, loading } = useFetch(`/${media_type}/top_rated`);
  
  const onTabChange = (tab) => {
    setTime_window(tab.toLowerCase());
  };

    

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTab data={["Movie", "TV"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel  time_window = {media_type} data={data?.results} loading={loading}/>
    </div>
  );
};

export default TopRated;
