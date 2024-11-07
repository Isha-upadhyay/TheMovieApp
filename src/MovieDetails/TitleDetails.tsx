import React, { useContext, useEffect, useState } from "react";
import TitleOverview from "./Movie/MovieOverview";
import OtherTitleDetails from "./Movie/OtherMovieDetails";
import LandingPageSuspense from "../LandingPage/LandingPageSuspense";
import { Helmet } from "react-helmet";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { getKeyValue, options } from "../helper";
import { ThemeContext, TitleTypeProp } from "../AppContext";
import MovieDetailsBody from "./Movie/MovieDetailsBody";
import TVShowDetailsBody from "./TVShow/TVShowDetailsBody";

interface Props {
    titleID: string,
    videoPlayerStatus: Boolean
}

export interface MovieDetails {
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

export interface TVDetails {
    original_name: string,
    original_language: string,
    created_by: string,
    poster_path: string,
    backdrop_path: string,
    first_air_date: string,
    homepage: string,
    in_production: boolean,
    network_logo: string,
    network_name: string,
    number_of_episodes: number,
    number_of_seasons: number,
    tagline: string,
    genres: Array<string>,
    vote_average: number,
    overview: string,
    status: string,
    type: string,
    seasons: Array<Object>
}
export interface Crew {
    name: string,
    job: string
}
export interface MovieCast {
    name: string,
    characterName: string,
    castProfilePicture: string
}
export interface TVShowCast {
    name: string,
    characterName: string,
    castProfilePicture: string,
    total_episode_count?: number
}
export interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}
export interface ReleaseDateNCertification {
    country: string,
    country_release_date: string,
    content_rating: string
}
export interface StreamingProvider {
    logo_path: string,
    link: string
}

function TitleDetails({ titleID, videoPlayerStatus }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    if (mediaType === "movie") {
        return (
            <MovieDetailsBody movieID = { titleID } />
        )
    }
    else{
        return (
            <TVShowDetailsBody tvShowID={titleID} />
        )
    } 
}
export default TitleDetails;