import "./style.css";
import React from 'react'
import HeroSection from "./HeroSection/HeroSection";
import Trending from "./Trending/Trending";
import { ContentWrapper } from "../../components";
import Popular from "./Popular/Popular";

const Home = () => {
  return (
    <div className="homePage">
        <HeroSection/>
        <Trending/>
        <Popular/>
    </div>
  )
}

export default Home