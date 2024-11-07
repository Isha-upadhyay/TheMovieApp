
import CloseIcon from '../assets/close-icon.svg'
import { VideoDetails } from './TitleInfoLandingPage';


interface Props {
    videoDetails: VideoDetails|undefined
}

function VideoPlayer({ videoDetails }: Props) {
    return (
        <div className="videoPanel">
            <div className="videoPanelTitleBar">
                <div className="videoTitle">
                    Official Trailer
                    {/* {videoDetails?.name} */}
                </div>
                <div className="closeVideo">
                    <img src={CloseIcon} className="closeIcon" alt="close video player"></img>
                </div>
            </div>
            <div className="embedVideo">
                <iframe src={videoDetails?.video_path} className="videoPlayerIframe" title="Video Player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </div>
        </div>
    )
}
export default VideoPlayer;