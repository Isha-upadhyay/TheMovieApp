import AddToListSvg from '../assets/add-to-list.svg'
import FavoriteSvg from '../assets/favorite.svg'
import WatchlistSvg from '../assets/watchlist.svg'
import YourRatingSvg from '../assets/yourRating.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import CardNotLoaded from './CardNotLoaded'
import { SyntheticEvent, useContext } from 'react'
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import UserScore from '../UserScore'
import { ThemeContext, TitleTypeProp } from '../AppContext'

interface APIResponse {
    jsonResponse: object | null
}
interface Props {
    jsonResponse: APIResponse,
    topic: string,
    isAwaitingAPIResponse: boolean
}
interface CardDetails {
    title: string,
    id: number,
    media_type: string,
    release_date: string,
    vote_average: number,
    poster_path: string
}
function Cards({ jsonResponse, topic, isAwaitingAPIResponse }: Props): any {
    const {mediaType}: TitleTypeProp = useContext(ThemeContext);
    function getKeyValue(object: any, key: string): any {
        return object[key];
    }
    function transformDateTime(result: object): string {
        let apiDateTime: string = getKeyValue(result, "release_date") == undefined ? getKeyValue(result, "first_air_date") : getKeyValue(result, "release_date");
        const dateObj: Date = new Date(apiDateTime);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate: string = dateObj.toLocaleDateString('en-US', options);
        return formattedDate;
    }
    function formatAverageToPercentage(result: object): number {
        let voteAverage: number = getKeyValue(result, "vote_average");
        voteAverage *= 10;
        return Math.round(voteAverage);
    }

    const blurCard = (cardKeyID: string, cardMenuKeyID: string, movieOptions:string) => {
        const anyMovieOptionsActive: HTMLElement | null = document.querySelector('.isOptionsActive');
        anyMovieOptionsActive?.classList.toggle('isOptionsActive');
        if (anyMovieOptionsActive?.id !== movieOptions) {
            const movieOptionsDiv: HTMLElement | null = document.getElementById(movieOptions);
            movieOptionsDiv?.classList.toggle('isOptionsActive');
        }
        
        const anyBlurredCard: HTMLElement | null = document.querySelector('.blurCard');
        anyBlurredCard?.classList.toggle('blurCard');
        const anyCardMenuOn: HTMLElement | null = document.querySelector('.toggleDisplay');
        anyCardMenuOn?.classList.toggle('toggleDisplay');
        if (anyBlurredCard?.id !== cardKeyID) {
            const cardToBlur: HTMLElement | null = document.getElementById(cardKeyID);
            cardToBlur?.classList.toggle('blurCard');
        }
        if (anyCardMenuOn?.id !== cardMenuKeyID) {
            const cardMenuToDisplay: HTMLElement | null = document.getElementById(cardMenuKeyID);
            cardMenuToDisplay?.classList.toggle('toggleDisplay');
        }
    }

    if (isAwaitingAPIResponse || jsonResponse.hasOwnProperty("jsonResponse")) {
        return (
            <CardNotLoaded />
        )
    }

    if (!jsonResponse.hasOwnProperty("jsonResponse")) {
        const results: Array<object> = getKeyValue(jsonResponse, "results");
        let cardsToDisplay: Array<CardDetails> = [];
        results?.map((result, index) => {
            if (getKeyValue(result, "title") !== undefined || getKeyValue(result, "name")) {
                const mediaType:string = getKeyValue(result, "media_type")===undefined ? 'tv' : getKeyValue(result, "media_type")
                let newCard: CardDetails = {
                    title: getKeyValue(result, "title") == undefined ? getKeyValue(result, "name") : getKeyValue(result, "title"),
                    id: getKeyValue(result, "id"),
                    media_type: mediaType,
                    release_date: transformDateTime(result),
                    vote_average: formatAverageToPercentage(result),
                    poster_path: "https://www.themoviedb.org/t/p/w220_and_h330_face" + getKeyValue(result, "poster_path"),
                };
                cardsToDisplay = [...cardsToDisplay, newCard];
            }
        });
        const formatCardTitleToRoute: Function = (title: string) => {
            title = title.replace(/ /g, '-');
            title = title.replace(/:/g, '');
            return title;
        }

        return (
            cardsToDisplay.map((card, index) => {
                const cardKeyID: string = `${topic}-card-${index}`;
                const cardMenuKeyID: string = `${topic}-menu-${index}`;
                return (
                    <div className="card" key={cardKeyID} id={cardKeyID} aria-label={`result for ${topic}`}>
                        <a className="anchor" href={`/${card.media_type}/${card.id}-${formatCardTitleToRoute(card.title)}`}>
                            <div className="poster">
                                <LazyLoadImage className="cardPoster" src={card.poster_path} alt={card.title} loading='lazy' />
                            </div>
                            <div className="movieTitle" aria-label="movie/show title">
                                {card.title}
                            </div>
                            <div className="releaseDate" aria-label="movie/show - release date/first air date">
                                {card.release_date}
                            </div>
                            <div className="voteAverage" aria-label="movie/show average user ratings">
                                <UserScore voteAverage={card.vote_average} heightWidth='40px' fontSize='16px' offsetTop='3px' />
                            </div>
                        </a>
                        <div className="movieOptions" onClick={(event) => { blurCard(cardKeyID, cardMenuKeyID, `movieOptions-${index}`)}} id={`movieOptions-${index}`}>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <div className="cardActionItemsDiv" id={cardMenuKeyID} aria-label="action items for current movie/tv-show">
                            <ul className="cardActionItems" aria-label="movie/tv-show action items">
                                <li className="cardActionItem">
                                    <img src={AddToListSvg} className="listIcon" alt="Add To List"></img>
                                    <div className="itemDesc">
                                        Add to List
                                    </div>
                                </li>

                                <li className="cardActionItem">
                                    <img src={FavoriteSvg} className="listIcon" alt="Add to Favorite"></img>
                                    <div className="itemDesc">
                                        Favorite
                                    </div>
                                </li>

                                <li className="cardActionItem">
                                    <img src={WatchlistSvg} className="listIcon" alt="Add to Watchlist"></img>
                                    <div className="itemDesc">
                                        Watchlist
                                    </div>
                                </li>

                                <li className="cardActionItem" id={cardMenuKeyID}>
                                    <img src={YourRatingSvg} className="listIcon" alt="Your Rating"></img>
                                    <div className="itemDesc">
                                        Your rating
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })

        )
    }
}
export default Cards;