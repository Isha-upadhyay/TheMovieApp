import { useContext, useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import { ThemeContext, TitleTypeProp } from "../../AppContext";

interface Recommendation {
    title: string,
    vote_average: string,
    poster_path: string,
    release_date: string
}
interface Props {
    titleID: string
}
function Recommendations({ titleID }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    const [recommendations, setRecommendations] = useState<Array<Recommendation>>([]);
    const recommendationsEndpoint = `https://api.themoviedb.org/3/${mediaType}/${titleID}/recommendations`;
    function getKeyValue(object: any, key: string): any {
        if (object.hasOwnProperty(key))
            return object[key];
    }
    const formatVoteAverage: Function = (vote_average: number) => {
        return `${Math.round(vote_average * 10)}%`;
    }
    const formatReleaseDate: Function = (releaseDate: string) => {
        const yyyymmdd: Array<string> = releaseDate.split('-');
        yyyymmdd.reverse();
        const ddmmyyyy = `${yyyymmdd[1]}/${yyyymmdd[0]}/${yyyymmdd[2]}`;
        return ddmmyyyy;
    }
    const options: object = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDU5NjQxMTY3MjI3YjA3ZDJhNWVkZjgzZDZlOTczMCIsInN1YiI6IjY0Nzk4YWIyY2FlZjJkMDBjMjk5NTljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjKZMhqaOHP6C63nj6MjSxBDDLnR6-dgrzo7CsWcL3U'
        }
    };
    const getRecommendations: Function = async (url: string, options: object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const results: Array<Object> = getKeyValue(response, "results");
                setRecommendations(recommendations => {
                    const allRecommendations: Array<Recommendation> = results.map(recommendation => {
                        const newRecommendation: Recommendation = {
                            title: mediaType==="movie"?getKeyValue(recommendation, "title"):getKeyValue(recommendation, "original_name"),
                            vote_average: formatVoteAverage(getKeyValue(recommendation, "vote_average")),
                            poster_path: "https://www.themoviedb.org/t/p/w250_and_h141_face/" + getKeyValue(recommendation, "poster_path"),
                            release_date: formatReleaseDate(mediaType==="movie"?getKeyValue(recommendation, "release_date"):getKeyValue(recommendation, "first_air_date"))
                        }
                        return newRecommendation;
                    })
                    return allRecommendations;
                })
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getRecommendations(recommendationsEndpoint, options);
    }, [])
    if (recommendations.length > 0) {
        return (
            <>
                <span className="sectionHeading">Recommendations</span>
                <div className="recommendations">
                    {
                        recommendations.map((recommendation: Recommendation, index: number) => {
                            return <RecommendationCard recommendation={recommendation} index={index} key={`recommendations-${index}`} />
                        })
                    }
                </div>
            </>
        )
    }
    else return (
        <>
            <span className="sectionHeading">Recommendations</span>
            <span>We don't have enough data to suggest any movies based on The Flash. You can help by rating movies you've seen.</span>
        </>
    )
}
export default Recommendations;