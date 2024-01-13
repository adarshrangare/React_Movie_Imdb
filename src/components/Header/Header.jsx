import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./style.css";

import { ContentWrapper } from "../";
import logo from "../../assets/blackhole-movie.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  

  const navigationHandler = (type) => {
    if (type == "home") {
      navigate("/");
    } else if (type == "movie") {
      navigate("/explore/movie");
    } else if (type == "tv") {
      navigate("/explore/tv");
    } else if (type == "login") {
      navigate("/login");
    }
    setMobileMenu(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter") {      
      if(query.trim().length > 0){
        navigate(`/search/${query}`)
        setTimeout(() => {
          setShowSearch(false);
        }, 1000);
      } else{
        toast.error('Please Enter a Movie or TV Show!', {
          position: "bottom-right",
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
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div
          className="logo"
          onClick={() => {
            navigationHandler("home");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV/Web Series
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu && "Search"}
          </li>
          <li className="menuItem">
            <FaHeart
              onClick={() => {
                navigationHandler("favourite");
              }}
            />
            {mobileMenu && "Favourites"}
          </li>
          <li className="menuItem">
          <FaUser
              onClick={() => {
                navigationHandler("login");
              }}
            />
            {mobileMenu && "User"}
          </li>
         
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} className="search" />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} className="close" />
          ) : (
            <SlMenu onClick={openMobileMenu} className="hamburger" />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
