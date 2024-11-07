import { LazyLoadImage } from "react-lazy-load-image-component";
import { Image } from "./Media";
import RightArrowSVG from '../../assets/right-arrow.svg'

interface Props {
    backdrops: Array<Image>
}
function Backdrops({ backdrops }: Props) {
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    if (updateText)
        updateText.innerHTML = "View All Backdrops";
    return (
        <div className="titleBackdrops scrollbar">
            {
                backdrops.map((backdrop: Image, index: number) => {
                    return (
                        <div className="backdrop" key={`backdrops-${index}`}>
                            <LazyLoadImage className="backdrop" src={backdrop.image_path} alt='backdrop' loading='lazy' />
                        </div>
                    )
                })
            }
            <div className="viewMorePopular" key={"viewMore"}>
                <span className="viewMoreText">View More</span>
                <span className="viewMoreSVG"><img src={RightArrowSVG} alt="View More" className="viewMoreSVG"></img></span>
            </div>
        </div>
    )
}
export default Backdrops;