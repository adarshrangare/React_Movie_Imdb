import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import "./style.css";
import { ContentWrapper, Img } from "../../../components";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HeroSection = () => {
  const [background, setBackgound] = useState("https://image.tmdb.org/t/p/original/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading } = useFetch("/movie/top_rated");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  // console.log(url);

  useEffect(() => {
    let randomIndex = Math.round(Math.random() * 18);
    const bg = data?.results[randomIndex]?.backdrop_path;
    console.log("useEffect with data dep",bg);
    

    setBackgound(`${url?.backdrop}${bg}`);
  }, [data]);

  



 

  const searchQueryHandler = (e) => {
    if (e.key === "Enter") {

      if(searchQuery.trim().length > 0){
        navigate(`/search/${searchQuery}`)
      } else{
        toast.error('Please Enter a Movie or TV Show!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",});
      }


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
          <span className="title">Blackhole</span>
          <span className="subTitle">
            of Unlimited Movies and TV and Web Series to Discover and Review.
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
            <button onClick={()=>{
              if(searchQuery.trim().length > 0){
                navigate(`/search/${searchQuery}`)
              } else{
                toast.error('Please Enter a Movie or TV Show!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",});
              }
            }}>Search</button>
           
          </div>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroSection;
