import React from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './DetailsBanner/DetailsBanner';
import Cast from './Cast/Cast';
import VideoSection from './VideoSection/VideoSection';
import "./style.css";
import Similar from './Carousel/Similar';
import Recommendation from './Carousel/Recommendation';


const Details = () => {

  const {mediaType, id} = useParams();

  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits, loading:creditLoading} = useFetch(`/${mediaType}/${id}/credits`);


  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast casts={credits?.cast} loading={creditLoading} />
      <VideoSection videos={data?.results} laoding={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details