import { LazyLoadImage } from "react-lazy-load-image-component";
import { Image } from "./Media";
import RightArrowSVG from '../../assets/right-arrow.svg'

interface Props {
    posters: Array<Image>
}
function Posters({ posters }: Props) {
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    if (updateText)
        updateText.innerHTML = "View All Posters";
    return (
        <div className="titlePosters scrollbar">
            {
                posters.map((poster: Image, index: number) => {
                    return (
                        <div className="poster" key={`posters-${index}`}>
                            <LazyLoadImage className="mediaPoster" src={poster.image_path} alt='poster' loading='lazy' />
                        </div>
                    )
                })
            }

            <div className="viewMorePosters" key={"viewMore"}>
                <span className="viewMoreText">View More</span>
                <span className="viewMoreSVG"><img src={RightArrowSVG} alt="View More" className="viewMoreSVG"></img></span>
            </div>
        </div>
    )
}
export default Posters;