import { useContext, useEffect, useState } from "react";
import '../../styles/keywords.css'
import { ThemeContext, TitleTypeProp } from "../../AppContext";

interface Props {
    titleID: string
}

function Keywords({ titleID }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    const [keywords, setKeywords] = useState<Array<string>>([]);
    const getTitleKeywordsByID: string = `https://api.themoviedb.org/3/${mediaType}/${titleID}/keywords`;
    function getKeyValue(object: any, key: string): any {
        if (object.hasOwnProperty(key))
            return object[key];
    }
    const options: object = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDU5NjQxMTY3MjI3YjA3ZDJhNWVkZjgzZDZlOTczMCIsInN1YiI6IjY0Nzk4YWIyY2FlZjJkMDBjMjk5NTljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjKZMhqaOHP6C63nj6MjSxBDDLnR6-dgrzo7CsWcL3U'
        }
    };
    const getTitleKeywordsAsync = async (url: string, options: object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const responseKeywords: Array<Object> = mediaType==="tv"?getKeyValue(response, "results"):getKeyValue(response,"keywords");
                const keywords = responseKeywords?.map((keywordObject: Object, index: number) => {
                    return getKeyValue(keywordObject, "name");
                });
                setKeywords(keywords);
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getTitleKeywordsAsync(getTitleKeywordsByID, options);
    }, [])

    if (keywords.length != 0) {
        return (
            <div className="keywords">
                <span className="keywordsHeading">Keywords</span>
                <div className="allKeywords">
                    {
                        keywords.map((keyword, index) => {
                            return (
                                <div className="keyword" id={`keyword-${index}`} key={`keyword-${index}`}>
                                    {keyword}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <span>No keywords have been added.</span>
        )
    }
}
export default Keywords;