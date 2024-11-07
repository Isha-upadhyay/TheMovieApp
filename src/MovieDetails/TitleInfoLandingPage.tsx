import { useLocation } from "react-router-dom";
import Footer from "../LandingPage/Footer";
import Header from "../LandingPage/Header";
import { useRef, useState } from "react";
import TitleDetails from "./TitleDetails";
import { Helmet } from 'react-helmet';
import VideoPlayer from "./VideoPlayer";
import '../styles/videoplayer.css'

export interface VideoDetails {
  name: string,
  video_path: string
}

function TitleInfoLandingPage() {
  const routeURL: string = useLocation().pathname;
  const titleID = useRef<string>(routeURL.split('/')[2].split('-')[0]);
  const titleName = useRef<string>(routeURL.split('/')[2].split('-')[1]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails>();
  const [videoPlayerStatus, setVideoPlayerStatus] = useState<Boolean>(false);
  return (
    <div className="movieDetails">
      <div className="bodyContents">
        <Header />
        <TitleDetails titleID={titleID.current} videoPlayerStatus={videoPlayerStatus} />
        <Footer />
      </div>
      {
        videoPlayerStatus ?
          <div className="videoPlayer">
            <VideoPlayer videoDetails={videoDetails} />
          </div> : null
      }
    </div>
  )
}
export default TitleInfoLandingPage;