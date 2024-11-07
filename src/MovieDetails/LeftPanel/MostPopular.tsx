import { LazyLoadImage } from "react-lazy-load-image-component"
import { Image, Video } from "./Media"
import RightArrowSVG from '../../assets/right-arrow.svg'
import PlaySVG from '../../assets/play.svg'

interface Props {
    mostPopular: [Video, Image, Image] | null,
    videoPlayerStatus: Boolean
}
function MostPopular({ mostPopular, videoPlayerStatus }: Props) {
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    const openVideoInModal: Function = (streaming_path: string) => {
        console.log(streaming_path);
        const videoPlayer: HTMLElement | null = document.querySelector(`.videoPlayer`);
        videoPlayer?.classList.toggle('isActive');
    }
    if (updateText)
        updateText.innerHTML = "";
    if (mostPopular) {
        return (
            <div className="popularMedia scrollbar">
                <div className="video" onClick={(event) => (openVideoInModal(mostPopular[0].streaming_path))}>
                    <img src={mostPopular[0].thumbnail_path} className="videoThumbnail" alt={`${mostPopular[0].name} thumbnail`}></img>
                    <div className="playButton">
                        <img className="playButtonSVG" src={PlaySVG} alt="Play Video"></img>
                    </div>
                </div>
                <div className="backdrop">
                    <LazyLoadImage className="backdrop" src={mostPopular[1].image_path} alt='backdrop' loading='lazy' />
                </div>
                <div className="poster">
                    <LazyLoadImage className="mediaPoster" src={mostPopular[2].image_path} alt='poster' loading='lazy' />
                </div>
                <div className="viewMorePopular" key={"viewMore"}>
                    <span className="viewMoreText">View More</span>
                    <span className="viewMoreSVG"><img src={RightArrowSVG} alt="View More" className="viewMoreSVG"></img></span>
                </div>
            </div>
        )
    }
    else return (<></>)
}
export default MostPopular
