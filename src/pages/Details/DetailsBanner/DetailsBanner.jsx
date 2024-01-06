import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.css";
import useFetch from "../../../hooks/useFetch";
import PosterFallback from "../../../assets/no-poster.png";

import {
  ContentWrapper,
  Genres,
  Rating,
  Img,
  VideoModal,
} from "../../../components";
import { PlayButton } from "./PlayButton";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  console.log(data);
  const { url, genres } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter(
    (member) => member.job.toLowerCase() == "director"
  );

  const writer = crew?.filter(
    (member) =>
      member.job.toLowerCase() == "story" ||
      member.job.toLowerCase() == "screenplay" ||
      member.job.toLowerCase() == "writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  //for video Trailer Modal
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />

                    <div className="row">
                      <Rating rating={data?.vote_average.toFixed(1)} />
                      <div className="playbtn" onClick={()=>{setShow(true)
                        setVideoId(video?.key);
                      }}>
                        <PlayButton />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Synopsis</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:{""} </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:{""} </span>
                          <span className="text">
                            {dayjs(data.release_date).format(
                              "dddd, MMM DD, YYYY"
                            )}
                          </span>
                        </div>
                      )}

                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:{""} </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:</span>
                        <span className="text">
                          {director.map((dir, idx) => (
                            <span>
                              {dir.name}
                              {director?.length - 1 !== idx && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:</span>
                        <span className="text">
                          {writer?.map((dir, idx) => (
                            <span>
                              {dir.name}
                              {writer?.length - 1 !== idx && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator:</span>
                        <span className="text">
                          {data?.created_by?.map((dir, idx) => (
                            <span>
                              {dir.name}
                              {data?.created_by?.length - 1 !== idx && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoModal
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
