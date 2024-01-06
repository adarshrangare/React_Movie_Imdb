import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  

  return (
    <div className="genres">
      {data?.map((genreId,index) => {
        if (!genres[genreId]?.name) {
          return;
        }

        return (
          <div className="genre" key={`${genreId.id}${index}`}>
            {genres[genreId]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
