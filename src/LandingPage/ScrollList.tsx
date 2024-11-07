import { CSSProperties, SyntheticEvent, useEffect, useState } from "react";
import ListFilters from "./ListFilters";
import Cards from "./Cards";
import FilterOptions from "./FilterOptions";

interface Props {
    topic: string
}
interface TopicData {
    title: string,
    filters: string[],
    bkgImage: string
}
interface APIResponse {
    jsonResponse: object | null
}
function ScrollList({ topic }: Props) {
    const listData = {
        "trending": {
            "title": "Trending",
            "filters": ["Today", "This Week"],
            "bkgImage": "https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg"
        },
        "popular": {
            "title": "What's Popular",
            "filters": ["Streaming", "On TV", "For Rent", "In Theatres"],
            "bkgImage": "none"
        },
        "freeToWatch": {
            "title": "Free To Watch",
            "filters": ["Movies", "TV"],
            "bkgImage": "none"
        }
    }

    const [currentActiveFilter, setActiveFilter] = useState<string>(`${topic}-0`);
    const [apiResponse, setApiResponse] = useState<APIResponse>({ jsonResponse: null });
    const [isAwaitingAPIResponse, setIsAwaitingAPIResponse] = useState<boolean>(false);
    let apiToCall: string = "";
    const options: object = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDU5NjQxMTY3MjI3YjA3ZDJhNWVkZjgzZDZlOTczMCIsInN1YiI6IjY0Nzk4YWIyY2FlZjJkMDBjMjk5NTljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjKZMhqaOHP6C63nj6MjSxBDDLnR6-dgrzo7CsWcL3U'
        }
    };

    function getKeyValue(object: any, key: string): any {
        return object[key];
    }
    const apiList: Object = {
        "trending-0": "https://api.themoviedb.org/3/trending/all/day",
        "trending-1": "https://api.themoviedb.org/3/trending/all/week",
        "popular-0": "https://api.themoviedb.org/3/trending/all/day",
        "popular-1": "https://api.themoviedb.org/3/tv/popular",
        "popular-2": "https://api.themoviedb.org/3/trending/all/day",
        "popular-3": "https://api.themoviedb.org/3/movie/now_playing",
        "freeToWatch-0": "https://api.themoviedb.org/3/trending/all/day",
        "freeToWatch-1": "https://api.themoviedb.org/3/trending/all/day"
    }

    const topicData: TopicData = getKeyValue(listData, topic);
    let styles: CSSProperties = { minHeight: '280px', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' };
    if (topicData.bkgImage !== "none")
        styles.backgroundImage = `url(${topicData.bkgImage})`

    const toggleFilterActive: Function = (event: SyntheticEvent, key: string, topic: string) => {
        let elementToToggle: HTMLElement | null = document.getElementById(key);
        let currentActiveElement: HTMLElement | null = document.querySelector(`.${topic}.isActive`);
        currentActiveElement?.classList.remove('isActive');
        elementToToggle?.classList.add('isActive');
        setActiveFilter(key);
    }


    const getAPIData = async (url: string, options: object) => {
        setIsAwaitingAPIResponse(true);
        await fetch(apiToCall, options)
            .then(response => response.json())
            .then(response => {
                setApiResponse(response);
                setIsAwaitingAPIResponse(false);
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        apiToCall = getKeyValue(apiList, `${topic}-0`);
        getAPIData(apiToCall, options);
    }, [])

    useEffect(() => {
        apiToCall = getKeyValue(apiList, currentActiveFilter);
        getAPIData(apiToCall, options);
    }, [currentActiveFilter])

    return (
        <div className="scrollList" aria-label={`${topic} results`}>
            <div className="listTitleAndCategories">
                <div className="listTitle">
                    {topicData.title}
                </div>
                <ul className="filterList">
                    <ListFilters filters={topicData.filters} topic={topic} toggleFilterActive={toggleFilterActive} />
                </ul>
                {/* <select className="dropdownFilterList">
                    <FilterOptions filters={topicData.filters} topic={topic} toggleFilterActive={toggleFilterActive} />
                </select> */}
            </div>
            <div className="listCards" style={styles} aria-label={`filtered movie/tv shows for ${topic}`}>
                <Cards jsonResponse={apiResponse} topic={topic} isAwaitingAPIResponse={isAwaitingAPIResponse} />
            </div>
        </div>
    )
}
export default ScrollList;