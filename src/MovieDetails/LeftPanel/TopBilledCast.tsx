import { TVShowCast } from "../TitleDetails";
import CastCard from "./CastCard";
import RightArrowSVG from '../../assets/right-arrow.svg'
import { title } from "process";
import { ThemeContext, TitleTypeProp } from "../../AppContext";
import { useContext } from "react";

interface Props {
    titleCast: Array<TVShowCast>
}

function TopBilledCast({titleCast}:Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    return (
        <div className="topBilledCast">
            {
                mediaType==="movie"?
                <div className="heading">Top Billed Cast</div>:
                <div className="heading">Series Cast</div>
            }
            <div className="titleCast">
                {
                    titleCast.map((cast, index) => {
                        if (index < 10)
                            return <CastCard cast={cast} key={`cast-${index}`} />
                        else return (
                            <div className="viewMore" key={"viewMore"}>
                                <span className="viewMoreText">View More</span>
                                <span className="arrowSVG"><img src={RightArrowSVG} alt="View More"></img></span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="fullCastNCrew">Full Cast & Crew</div>
        </div>
    )
}
export default TopBilledCast;