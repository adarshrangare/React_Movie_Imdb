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
} from "./pages";

const App = () => {
  const { url, genres } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  // console.log(url)

  useEffect(() => {
    const apiTest = () => {
      fetchDataFromAPI("/movie/popular").then((res) => {
        console.log(res);
        dispatch(getApiConfig(res));
      });
    };

    // apiTest();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
