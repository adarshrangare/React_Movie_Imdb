import React from "react";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel, ContentWrapper, SwitchTab } from "../../../components";

const Trending = () => {
    
  const [time_window, setTime_window] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${time_window}`);
  
  const onTabChange = (tab) => {
    setTime_window(tab.toLowerCase());
  };

    

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel  time_window = {time_window} data={data?.results} loading={loading}/>
    </div>
  );
};

export default Trending;
