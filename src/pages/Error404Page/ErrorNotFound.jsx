import React from "react";
import { ContentWrapper } from "../../components";
import "./style.css";
const ErrorNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
    </div>
  );
};

export default ErrorNotFound;
