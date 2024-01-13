import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import { ContentWrapper } from "../";

import "./style.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Explore the universe
          of cinema with Blackhole Movie DB, your ultimate destination for movie
          information. Discover a vast collection of films, from timeless
          classics to the latest releases. Immerse yourself in the magic of
          storytelling and cinematography.
          
        </div>
        

        <div className="socialIcons">
          <span className="icon facebook">
            <FaFacebookF />
          </span>
          <span className="icon instagram">
            <FaInstagram />
          </span>
          <span className="icon github">
            <FaGithub />
          </span>
          <span className="icon linkedin">
            <FaLinkedin />
          </span>
        </div>

        <div className="copyright">
          © 2024 Blackhole Movie DB. All rights reserved. 
          </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
