import React from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { ContentWrapper, Img } from "../../../components";
import avatar from "../../../assets/avatar.png";

const Cast = ({ casts, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
//   console.log(casts);
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {casts?.map((cast) => {

                let profileImg = cast.profile_path? url.profile + cast.profile_path : avatar ;

              return <div className="listItem" key={cast?.id}>
                <div className="profileImg">
                    <Img src={profileImg} />
                </div>
                <div className="name">
                    {cast?.name}
                </div>
                <div className="character">
                    {`as ${cast?.character}`}
                </div>
              </div>;
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
