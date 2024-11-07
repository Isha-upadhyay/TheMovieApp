
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getKeyValue, options } from '../../helper';
import { StreamingProvider, TVDetails } from '../TitleDetails';
import ArrowExpandSVG from '../../assets/arrow-expand.svg'
import AddToListSvg from '../../assets/add-to-list-white.svg'
import FavoriteSvg from '../../assets/favorite-white.svg'
import WatchlistSvg from '../../assets/watchlist-white.svg'
import YourRatingSvg from '../../assets/yourRating-white.svg'
import PlaySvg from '../../assets/play.svg'
import UserScore from '../../UserScore';
import '../../styles/titleoverview.css'

interface TitleDetails {
    original_title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    year_of_release: string,
    runtime: string,
    tagline: string,
    genres: Array<string>,
    vote_average: number,
    overview: string,
    original_language: string
}
interface Crew {
    name: string,
    job: string
}
interface ReleaseDateNCertification {
    country: string,
    country_release_date: string,
    content_rating: string
}

interface Props {
    titleInfo: TVDetails,
    titleID: string,
    releaseDateAndCertification: ReleaseDateNCertification | undefined,
    providers: StreamingProvider | undefined
}

export const enableDropdown: Function = (listActionToToggle: string) => {
    const dropdownListToToggle: HTMLElement | null = document.getElementById(`${listActionToToggle}-tooltip`);
    dropdownListToToggle?.classList.toggle("displayActions")
}

function TVShowOverview({ titleInfo, titleID, releaseDateAndCertification, providers }: Props) {
    let titleWrapperBkgImage: CSSProperties = {};
    titleWrapperBkgImage.backgroundImage = `url(${titleInfo.backdrop_path})`;
    const blurPoster: Function = () => {
        const visiblePoster: HTMLElement | null = document.querySelector('.visiblePoster');
        visiblePoster?.classList.toggle('isHidden');
        const hiddenBlurredDiv: HTMLElement | null = document.querySelector('.hiddenBlurredDiv');
        hiddenBlurredDiv?.classList.toggle('isBlurActive');
    }
    const unblurPoster: Function = () => {
        const visiblePoster: HTMLElement | null = document.querySelector('.visiblePoster');
        visiblePoster?.classList.toggle('isHidden');
        const hiddenBlurredDiv: HTMLElement | null = document.querySelector('.hiddenBlurredDiv');
        hiddenBlurredDiv?.classList.toggle('isBlurActive');
    }
    
    return (
        <div className="titleWrapper">
            <div className="background" style={titleWrapperBkgImage}></div>
            <div className="titleOverview">
                <div className="posterAndProvider">
                    <div className="titlePoster" onMouseOver={(event) => { blurPoster() }} onMouseOut={(event) => { unblurPoster() }}>
                        <div className="visiblePoster">
                            <LazyLoadImage className="titlePosterImage" src={titleInfo.poster_path} alt={titleInfo.original_name} loading='lazy' />
                        </div>
                        <div className="hiddenBlurredDiv">
                            <div className="svgAndText">
                                <img src={ArrowExpandSVG} className="arrowExpandSVG" alt="Expand"></img>
                                <span>Expand</span>
                            </div>
                        </div>
                    </div>
                    {
                        providers != undefined ?
                            <div className="streamingProvider">
                                <div className="providerLogo">
                                    <img src={providers.logo_path} className="providerLogoImg" alt="Streaming Provider Logo"></img>
                                </div>
                                <div className="streamText">
                                    <span className="streamText1">Available to Rent or Buy</span>
                                    <span className="streamText2">Watch Now</span>
                                </div>
                            </div>
                            : null
                    }
                </div>
                <div className="titleInfo">
                    <div className="titleAndYOR">
                        <span className="originalTitle">{titleInfo.original_name}</span>
                        <span className="yearOfRelease">({titleInfo.first_air_date})</span>
                    </div>
                    <div className="genreAndRunTime">
                        {
                            releaseDateAndCertification?.content_rating === undefined ?
                                <span className="contentRating">PG-13</span> :
                                <span className="contentRating">{releaseDateAndCertification?.content_rating}</span>
                        }
                        <span className="titleReleaseDate">{releaseDateAndCertification?.country_release_date}</span>
                        <span className="countryOfRelease">&nbsp;{releaseDateAndCertification?.country}</span>
                        <div className="genreDotOuter"><div className="dotInner"></div></div>
                        <div className="genres">
                            {
                                titleInfo.genres.map((genre, index) => {
                                    if (index == titleInfo.genres.length - 1)
                                        return (<span className="genre" key={`genre-${index}`}>{genre}</span>);
                                    else return (<span className="genre" key={`genre-${index}`}>{genre},&nbsp;</span>)
                                })
                            }
                        </div>
                    </div>
                    <div className="userscoreAndOtherOptions">
                        <div className="userScoreTitlePage">
                            <UserScore voteAverage={Math.round(titleInfo.vote_average * 10)} heightWidth={'60px'} fontSize='24px' offsetTop='6px' />
                        </div>
                        <div className="userScoreText">
                            User Score
                        </div>
                        <div className="otherOptions">
                            <div className="titleOptions" id='options-add-to-list' onMouseOver={(event) => enableDropdown('options-add-to-list')} onMouseOut={(event) => enableDropdown('options-add-to-list')}>
                                <img src={AddToListSvg} className="titleOptionsSVG" alt="Add to List"></img>
                                <div className="titleOptionsTooltip" id='options-add-to-list-tooltip'>Add to list</div>
                            </div>
                            <div className="titleOptions" id='options-favorite' onMouseOver={(event) => enableDropdown('options-favorite')} onMouseOut={(event) => enableDropdown('options-favorite')}>
                                <img src={FavoriteSvg} className="titleOptionsSVG" alt="Mark as favorite"></img>
                                <div className="titleOptionsTooltip" id='options-favorite-tooltip'>Mark as favorite</div>
                            </div>
                            <div className="titleOptions" id='options-watchlist' onMouseOver={(event) => enableDropdown('options-watchlist')} onMouseOut={(event) => enableDropdown('options-watchlist')}>
                                <img src={WatchlistSvg} className="titleOptionsSVG" alt="Add to your watchlist"></img>
                                <div className="titleOptionsTooltip" id='options-watchlist-tooltip'>Add to your watchlist</div>
                            </div>
                            <div className="titleOptions" onMouseOver={(event) => enableDropdown('options-rate')} onMouseOut={(event) => enableDropdown('options-rate')}>
                                <img src={YourRatingSvg} className="titleOptionsSVG" alt="Rate it"></img>
                                <div className="titleOptionsTooltip" id='options-rate-tooltip'>Rate it!</div>
                            </div>
                        </div>
                        <div className="playTrailer">
                            <img src={PlaySvg} className="titleOptionsSVG" alt="Play Trailer"></img>
                            <span>Play Trailer</span>
                        </div>
                    </div>
                    <div className="tagline">
                        {titleInfo.tagline}
                    </div>
                    <div className="overview">
                        <div className="overviewHeading">
                            Overview
                        </div>
                        <div className="titleDescription">
                            <p>{titleInfo.overview}</p>
                        </div>
                    </div>
                    <div className="titleCredits">
                        <div className="jobAndCredit">
                            <div className="credit">
                                {titleInfo.created_by}
                            </div>
                            <div className="job">
                                Creator
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TVShowOverview;