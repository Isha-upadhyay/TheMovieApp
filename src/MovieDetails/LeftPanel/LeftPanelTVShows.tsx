import CastCard from "./CastCard";
import Media from "./Media";
import Recommendations from "./Recommendations";
import Social from "./Social";
import '../../styles/social.css'
import { TVDetails, TVShowCast } from "../TitleDetails";
import TopBilledCast from "./TopBilledCast";
import LatestSeason from "./LatestSeason";

interface Props {
    titleInfo: TVDetails,
    titleCast: Array<TVShowCast>,
    titleID: string,
    videoPlayerStatus: Boolean
}

function LeftPanelTVShows({ titleInfo, titleCast, titleID, videoPlayerStatus }: Props) {
    return (
        <div className="leftPanel">
            <section className="topBilledCastSection">
                <TopBilledCast titleCast={titleCast} />
            </section>
            <section className="latestSeasonSection">
                <LatestSeason titleInfo={titleInfo} />
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
export default LeftPanelTVShows;