import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import { StreamingProvider, TVShowCast } from "../TitleDetails";

interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}

interface Props {
    titleCast: Array<TVShowCast>,
    titleID: string,
    otherTitleDetails: OtherDetails | undefined,
    videoPlayerStatus: boolean,
    providers: StreamingProvider|undefined
}

function OtherMovieDetails({ titleCast, titleID, otherTitleDetails, videoPlayerStatus, providers }: Props) {
    titleCast = titleCast.slice(0, 11);
    return (
        <div className="otherDetails">
            <LeftPanel titleCast={titleCast} titleID={titleID} videoPlayerStatus={videoPlayerStatus}></LeftPanel>
            <RightPanel otherTitleDetails={otherTitleDetails} titleID={titleID} providers={providers}></RightPanel>
        </div>
    )
}
export default OtherMovieDetails;