import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css";

import { ContentWrapper } from "../";
import logo from "../../assets/movix-logo.svg";

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

  const focusSearch = () => {
    const searchBar = document.getElementById("searchbar");
    console.log(searchBar);
    searchBar.focus();
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
            <HiOutlineSearch onClick={focusSearch} />
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
          </li>
        </ul>
        <div className="mobileMenuItems">
          {/* <HiOutlineSearch onClick={focusSearch}  /> */}
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <>
              <SlMenu onClick={openMobileMenu} />
              <FaUser
                onClick={() => {
                  navigationHandler("login");
                }}
              />
            </>
          )}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
