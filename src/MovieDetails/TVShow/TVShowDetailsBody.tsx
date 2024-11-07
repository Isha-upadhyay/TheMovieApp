import { useContext, useEffect, useState } from "react";
import {  Crew, MovieDetails, OtherDetails, ReleaseDateNCertification, StreamingProvider, TVDetails, TVShowCast } from "../TitleDetails";
import { ThemeContext, TitleTypeProp } from "../../AppContext";
import { getKeyValue, options } from "../../helper";
import { Helmet } from "react-helmet";
import TitleOverview from "../Movie/MovieOverview";
import OtherTitleDetails from "../Movie/OtherMovieDetails";
import TVShowOverview from "./TVShowOverview";
import OtherTVShowDetails from "./OtherTVShowDetails";
import LandingPageSuspense from "../../LandingPage/LandingPageSuspense";

interface Props {
    tvShowID: string
}

function MovieDetailsBody({ tvShowID }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    const getTitleDetailsByID: string = `https://api.themoviedb.org/3/${mediaType}/${tvShowID}`;
    const getTitleCreditsByID: string = `https://api.themoviedb.org/3/${mediaType}/${tvShowID}/aggregate_credits`;
    const [titleInfo, setTitleInfo] = useState<TVDetails>();
    const [titleCast, setTitleCast] = useState<Array<TVShowCast>>([]);
    const [releaseDateAndCertification, setReleaseDateAndCertification] = useState<ReleaseDateNCertification>();
    const [providers, setProvider] = useState<StreamingProvider>();
    const videoPlayerStatus = false;

    const setGenres: Function = (titleGenreIDs: Array<number>) => {
        const titleGenres: Array<string> = titleGenreIDs.map((genreID) => {
            return getKeyValue(genreID, "name");
        })
        return titleGenres;
    }

    const formatRuntime: Function = (runtime: number) => {
        return `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    }

    const formatReleaseDate: Function = (releaseDate: string) => {
        const yyyymmdd: Array<string> = releaseDate.split('-');
        yyyymmdd.reverse();
        const ddmmyyyy = `${yyyymmdd[0]}/${yyyymmdd[1]}/${yyyymmdd[2]}`;
        return ddmmyyyy;
    }

    const filterTopCast: Function = (response: JSON) => {
        const allCast: Array<Object> = getKeyValue(response, "cast");
        allCast.map((cast:Object) => {
            const roles: Array<Object> = getKeyValue(cast, "roles");
            let rolesAsString : string = '';
            let totalRoles: number = roles.length;
            roles.map((role:Object,index:number)=>{
                rolesAsString+=getKeyValue(role,"character");
                    if(index<totalRoles-1)
                    rolesAsString+=',';
            })
            const crrCast: TVShowCast = {
                name: getKeyValue(cast, "name"),
                characterName: rolesAsString,
                castProfilePicture: "https://www.themoviedb.org/t/p/w138_and_h175_face/" + getKeyValue(cast, "profile_path"),
                total_episode_count: getKeyValue(cast,"total_episode_count")
            }
            setTitleCast(titleCast => [...titleCast, crrCast]);
        })
    }

    const formatAirDate : Function = (formatAirDate:string) => {
        return formatAirDate.split('-')[0];
    }

    const getTitleDetailsAsync = async (url: string, options: object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                setTitleInfo({
                    original_name: getKeyValue(response, "original_name"),
                    original_language: getKeyValue(response, "original_language"),
                    created_by: getKeyValue(getKeyValue(response, "created_by")[0],"name"),
                    poster_path: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + getKeyValue(response, "poster_path"),
                    backdrop_path: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces' + getKeyValue(response, "backdrop_path"),
                    first_air_date: formatAirDate(getKeyValue(response, "first_air_date")),
                    homepage: getKeyValue(response, "homepage"),
                    in_production: getKeyValue(response, "in_production"),
                    network_logo: "https://www.themoviedb.org/t/p/h30"+getKeyValue(getKeyValue(response, "networks")[0],"logo_path"),
                    network_name: getKeyValue(getKeyValue(response, "networks")[0],"name"),
                    number_of_episodes: getKeyValue(response, "number_of_episodes"),
                    number_of_seasons: getKeyValue(response, "number_of_seasons"),
                    tagline: getKeyValue(response, "tagline"),
                    genres: setGenres(getKeyValue(response, "genres")),
                    vote_average: getKeyValue(response, "vote_average"),
                    overview: getKeyValue(response, "overview"),
                    status: getKeyValue(response, "status"),
                    type: getKeyValue(response, "type"),
                    seasons: getKeyValue(response,"seasons")
                });
            })
            .catch(error => console.error(error));
    }
    
    const getCastDetailsAsync = async (url: string, options: object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                filterTopCast(response);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getTitleDetailsAsync(getTitleDetailsByID, options);
        getCastDetailsAsync(getTitleCreditsByID, options);
    }, [])

    const formatCardTitleToRoute: Function = (title: string) => {
        title = title.replace(/ /g, '-');
        title = title.replace(/:/g, '');
        return title;
    }

    if (titleInfo !== undefined && titleCast.length>0) {
        const pageTitle = `${titleInfo.original_name} (TV Series - ${titleInfo.first_air_date}) - The Movie Database (TMDB)`
        return (
            <div className="bodyContent">
                <Helmet><title>{pageTitle}</title></Helmet>

                <TVShowOverview titleInfo={titleInfo} titleID={tvShowID} releaseDateAndCertification={releaseDateAndCertification} providers={providers} />

                <section className="otherTitleDetails">
                    <OtherTVShowDetails titleInfo={titleInfo} titleCast={titleCast} titleID={tvShowID} videoPlayerStatus={videoPlayerStatus} providers={providers} />
                </section>
            </div>
        )
    }
    else return (<LandingPageSuspense />)
}
export default MovieDetailsBody;