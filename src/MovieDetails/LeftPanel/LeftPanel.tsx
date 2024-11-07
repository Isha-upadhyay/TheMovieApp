import CastCard from "./CastCard";
import Media from "./Media";
import Recommendations from "./Recommendations";
import Social from "./Social";
import RightArrowSVG from '../../assets/right-arrow.svg'
import '../../styles/social.css'
import TopBilledCast from "./TopBilledCast";
import { TVShowCast } from "../TitleDetails";

interface Props {
    titleCast: Array<TVShowCast>,
    titleID: string,
    videoPlayerStatus: Boolean
}
function LeftPanel({ titleCast, titleID, videoPlayerStatus }: Props) {
    return (
        <div className="leftPanel">
        <section className="topBilledCastSection">
            <TopBilledCast titleCast={titleCast} />
        </section>
            <section className="socialSection">
                <Social titleID={titleID} />
            </section>
            <section className="mediaSection">
                <Media titleID={titleID} videoPlayerStatus={videoPlayerStatus} />
            </section>
            <section className="recommendationsSection">
                <Recommendations titleID={titleID} />
            </section>
        </div>
    )
}
export default LeftPanel;