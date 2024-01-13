import React from "react";
import { useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components";
import {
  Home,
  Explore,
  ErrorNotFound,
  SearchResult,
  Details,
  Login,
  SignUp,
  Favourites
} from "./pages";

const App = () => {
  const { url, genres } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  // console.log(url)

  useEffect(() => {
    const fetchApiConfig = () => {
      fetchDataFromAPI("/configuration").then((res) => {
        console.log(res);

        const urlCluster = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfig(urlCluster));
      });
    };

    fetchApiConfig();
    genresCall();
  }, []);

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];

    let allGenres = {};

    endpoints.forEach((endpoint) => {
      promises.push(fetchDataFromAPI(`/genre/${endpoint}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // console.log("all",allGenres);
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <div className="gradient"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
