import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
import { TVDetails } from "../TitleDetails";
import { getKeyValue } from "../../helper";
import '../../styles/latestSeason.css'

interface Props {
    titleInfo: TVDetails
}

interface SeasonDetails {
    air_date: string,
    episode_count: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
}

function LatestSeason({ titleInfo }: Props) {
    const latestSeason: Object = titleInfo.seasons[titleInfo.seasons.length - 1];
    const latestSeasonDetails: SeasonDetails = {
        air_date: getKeyValue(latestSeason, "air_date"),
        episode_count: getKeyValue(latestSeason, "episode_count"),
        name: getKeyValue(latestSeason, "name"),
        overview: getKeyValue(latestSeason, "overview"),
        poster_path: "https://www.themoviedb.org/t/p/w130_and_h195_bestv2" + getKeyValue(latestSeason, "poster_path"),
        season_number: getKeyValue(latestSeason, "season_number")
    }
    return (
        <>
            <div className="socialMenu">
                {
                    titleInfo.status === "Ended" ?
                        <div className="heading">Last Season</div> :
                        <div className="heading">Current Season</div>
                }
            </div>
            <div className="seasonInfo">
                <div className="seriesPoster">
                    <LazyLoadImage className="seriesPosterImg" src={latestSeasonDetails.poster_path} alt={latestSeasonDetails.name} loading='lazy' />
                </div>
                <div className="otherSeasonInfo">
                    <div className="seasonNameAndEpisodes">
                        <div className="seasonTitle">
                        {latestSeasonDetails.name}
                        </div>
                        <div className="yearAndEpisodeCount">
                            <span>{latestSeasonDetails.air_date} | {latestSeasonDetails.episode_count} Episodes </span>
                        </div>
                    </div>
                    <div className="seasonOverview">
                        {
                            latestSeasonDetails.overview === "" ?
                                <p>Season {latestSeasonDetails.season_number} of {titleInfo.original_name} premiered on {latestSeasonDetails.air_date}</p> :

                                <div className="reviewContent">
                                    <p>{latestSeasonDetails.overview}</p>
                                </div>
                        }

                    </div>
                </div>
            </div>
            <div className="fullCastNCrew">View All Seasons</div>
        </>
    )
}
export default LatestSeason;