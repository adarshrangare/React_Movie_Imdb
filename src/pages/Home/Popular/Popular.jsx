import React from "react";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel, ContentWrapper, SwitchTab } from "../../../components";

const Popular = () => {
    
  const [media_type, setTime_window] = useState("movie");

  const { data, loading } = useFetch(`/${media_type}/popular`);
  
  const onTabChange = (tab) => {
    setTime_window(tab.toLowerCase());
  };

    

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular <span style={{color:"red", textTransform:"capitalize"}} >{media_type+"s"}</span></span>
        <SwitchTab data={["Movie", "TV"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel  time_window = {media_type} data={data?.results} loading={loading}/>
    </div>
  );
};

export default Popular;
