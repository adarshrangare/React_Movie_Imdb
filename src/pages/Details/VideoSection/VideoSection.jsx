import React from "react";
import { useState } from "react";
import { ContentWrapper, VideoModal, Img} from "../../../components";
import { PlayButton } from "../DetailsBanner/PlayButton";
import './style.css'
const VideoSection = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = ({ videos, loading }) => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {videos?.map((video) => {
              return <div className="videoItem" key={video.id} onClick={(e)=>{
                setVideoId(video?.id)
                setShow(true);
              }}>
                <div className="videoThumbnail">
                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                    <PlayButton/>
                </div>
                <div className="videoTitle">
                    {video?.name}
                </div>
              </div>
            })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoModal
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
