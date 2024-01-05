import "./style.css";
import React from 'react'
import HeroSection from "./HeroSection/HeroSection";
import Trending from "./Trending/Trending";
import { ContentWrapper } from "../../components";
import Popular from "./Popular/Popular";
import TopRated from "./TopRated/TopRated";
import NowPlaying from "./NowPlaying/NowPlaying";
import Upcoming from "./Upcoming/Upcoming";

const Home = () => {
  return (
    <div className="homePage">
        <HeroSection/>
        <NowPlaying/>
        <Trending/>
        <Upcoming/>
        <Popular/>
        <TopRated/>

    </div>
  )
}

export default Home