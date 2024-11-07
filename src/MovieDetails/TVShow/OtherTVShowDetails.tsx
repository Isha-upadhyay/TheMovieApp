import LeftPanel from "../LeftPanel/LeftPanel";
import LeftPanelTVShows from "../LeftPanel/LeftPanelTVShows";
import RightPanel from "../RightPanel/RightPanel";
import RightPanelTVShows from "../RightPanel/RightPanelTVShows";
import { StreamingProvider, TVDetails, TVShowCast } from "../TitleDetails";

interface Props {
    titleInfo: TVDetails,
    titleCast: Array<TVShowCast>,
    titleID: string,
    videoPlayerStatus: boolean,
    providers: StreamingProvider|undefined
}

function OtherTVShowDetails({ titleInfo, titleCast, titleID, videoPlayerStatus, providers }: Props) {
    titleCast = titleCast.slice(0, 11);
    return (
        <div className="otherDetails">
            <LeftPanelTVShows titleInfo={titleInfo} titleCast={titleCast} titleID={titleID} videoPlayerStatus={videoPlayerStatus}></LeftPanelTVShows>
            <RightPanelTVShows titleInfo={titleInfo} titleID={titleID} providers={providers}></ RightPanelTVShows>
        </div>
    )
}
export default OtherTVShowDetails;