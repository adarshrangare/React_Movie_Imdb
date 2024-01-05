import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import "./style.css";
import { ContentWrapper, Img } from "../../../components";

const HeroSection = () => {
  const [background, setBackgound] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading } = useFetch("/movie/upcoming");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    let randomIndex = Math.round(Math.random() * 19);
    const bg = data?.results[randomIndex]?.backdrop_path;

    setBackgound(`${url?.backdrop}${bg}`);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} alt="backdrop" />
        </div>
      )}

      <div className="opacityLayer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Unlimited Movies and TV and Web Series to Discover and Review.
            Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              id="searchbar"
              placeholder="Search Movies or TV/Web Series"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
              
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroSection;
