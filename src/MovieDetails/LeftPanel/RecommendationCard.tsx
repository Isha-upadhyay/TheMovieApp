import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../styles/recommendationCard.css'
import FavoriteSvg from '../../assets/favorite.svg'
import WatchlistSvg from '../../assets/watchlist.svg'
import YourRatingSvg from '../../assets/yourRating.svg'
import CalendarSvg from '../../assets/calendar-icon.svg'

interface Recommendation {
    title: string,
    vote_average: string,
    poster_path: string,
    release_date: string
}
interface Props {
    recommendation: Recommendation,
    index: number
}

function RecommendationCard({ recommendation, index }: Props) {
    const optionsListActive: Function = (selector: string) => {
        const optionsListToToggle: HTMLElement | null = document.getElementById(`${selector}-options`);
        if (!optionsListToToggle?.classList.contains("optionsActive"))
            optionsListToToggle?.classList.toggle('optionsActive');
    }
    const optionsListInctive: Function = (selector: string) => {
        const optionsListToToggle: HTMLElement | null = document.getElementById(`${selector}-options`);
        optionsListToToggle?.classList.toggle('optionsActive');
    }
    return (
        <div className="recommendationCard" id={`recommendation-${index}`}>
            <div className="recommendationPoster" onMouseOver={(event) => optionsListActive(`recommendation-${index}`)} onMouseOut={(event) => optionsListInctive(`recommendation-${index}`)}>
                <LazyLoadImage className="recommendationPosterImage" src={recommendation.poster_path} alt={recommendation.title} loading='lazy' />
            </div>
            <div className="titleAndScore">
                <span className="recommendationTitle">{recommendation.title}</span>
                <span className="recommendationVoteAverage">{recommendation.vote_average}</span>
            </div>
            <div className="recommendationCardOptions" id={`recommendation-${index}-options`} onMouseOver={(event) => optionsListActive(`recommendation-${index}`)} onMouseOut={(event) => optionsListInctive(`recommendation-${index}`)}>
                <div className="releaseDateWithCalendarSVG">
                    <img src={CalendarSvg} className="recommendationOptionsSvg"></img>
                    <span>{recommendation.release_date}</span>
                </div>
                <div className="optionSVGs">
                    <img src={FavoriteSvg} className="recommendationOptionsSvg"></img>
                    <img src={WatchlistSvg} className="recommendationOptionsSvg"></img>
                    <img src={YourRatingSvg} className="recommendationOptionsSvg"></img>
                </div>
            </div>
        </div>
    )
}
export default RecommendationCard;