import { useContext, useEffect, useState } from 'react';
import '../../styles/media.css'
import { getKeyValue, options } from "../../helper";
import MostPopular from './MostPopular';
import Videos from './Videos';
import Backdrops from './Backdrops';
import Posters from './Posters';
import { ThemeContext, TitleTypeProp } from '../../AppContext';

interface Props {
    titleID: string,
    videoPlayerStatus: Boolean
}

export interface Image {
    image_path: string
}
export interface Video {
    video_key: string,
    streaming_path: string,
    thumbnail_path: string,
    name: string
}


function Media({ titleID, videoPlayerStatus }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    const [currentMediaFilter, setMediaFilter] = useState<string>('mostPopular');
    const [videos, setVideos] = useState<Array<Video>>([]);
    const [videosCount, setVideosCount] = useState<number>(0);
    const [backdrops, setBackdrops] = useState<Array<Image>>([]);
    const [backdropsCount, setBackdropsCount] = useState<number>(0);
    const [posters, setPosters] = useState<Array<Image>>([]);
    const [postersCount, setPostersCount] = useState<number>(0);
    const [mostPopular, setMostPopular] = useState<[Video, Image, Image] | null>(null);

    const toggleBottomPill: Function = (selector: string) => {
        const activePill: HTMLElement | null = document.querySelector(`.isMediaActive`);
        activePill?.classList.toggle('isMediaActive');
        const reviewsPill: HTMLElement | null = document.querySelector(`.${selector}`);
        reviewsPill?.classList.toggle('isMediaActive');
        setMediaFilter(selector);
    }
    const getTitleImages: string = `https://api.themoviedb.org/3/${mediaType}/${titleID}/images`;
    const getTitleVideos: string = `https://api.themoviedb.org/3/${mediaType}/${titleID}/videos`;
    const getImagesForTitle: Function = async (url: string, options: Object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const backdropsObj: Array<Object> = getKeyValue(response, "backdrops");
                backdropsObj.map((backdrop: Object) => {
                    const backdropImagePath: Image = {
                        image_path: "https://www.themoviedb.org/t/p/w533_and_h300_bestv2" + getKeyValue(backdrop, "file_path")
                    }
                    setBackdrops(backdrops => [...backdrops, backdropImagePath]);
                })
                setBackdrops(backdrops => backdrops.slice(0, 6));
                setBackdropsCount(backdropsObj.length);
                const postersObj: Array<Object> = getKeyValue(response, "posters");
                postersObj.map((poster: Object) => {
                    const posterImagePath: Image = {
                        image_path: "https://www.themoviedb.org/t/p/w220_and_h330_face" + getKeyValue(poster, "file_path")
                    }
                    setPosters(posters => [...posters, posterImagePath]);
                })
                setPosters(posters => posters.slice(0, 6));
                setPostersCount(postersObj.length);
            })
            .catch(error => console.error(error));
    }
    const getVideosForTitle: Function = async (url: string, options: Object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const videosObj: Array<Object> = getKeyValue(response, "results");
                videosObj.map((video: Object) => {
                    if (getKeyValue(video, "site") === "YouTube") {
                        const videoKey: string = getKeyValue(video, "key")
                        const videoPath: Video = {
                            streaming_path: "https://www.youtube.com/watch?v=" + videoKey,
                            thumbnail_path: "https://i.ytimg.com/vi/" + videoKey + "/hqdefault.jpg",
                            video_key: videoKey,
                            name: getKeyValue(video, "name")
                        }
                        setVideos(videos => [...videos, videoPath]);
                    }
                })
                setVideos(videos => videos.slice(0, 6));
                setVideosCount(videosObj.length);
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getImagesForTitle(getTitleImages, options);
        getVideosForTitle(getTitleVideos, options);
    }, [])
    if (backdropsCount && postersCount != 0 && videosCount != 0) {
    if (mostPopular === null) {
        setMostPopular([videos[0], backdrops[0], posters[0]]);
    }
    return (
        <div className="social">
            <div className="socialMenu mediaOptions">
                <span className="socialHeading">Media</span>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('mostPopular')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Most Popular</div>
                    </div>
                    <div className="bottomPill mostPopular isMediaActive"></div>
                </div>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('videos')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Videos</div>
                        <div className="countResults">{videosCount}</div>
                    </div>
                    <div className="bottomPill videos"></div>
                </div>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('backdrops')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Backdrops</div>
                        <div className="countResults">{backdropsCount}</div>
                    </div>
                    <div className="bottomPill backdrops"></div>
                </div>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('posters')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Posters</div>
                        <div className="countResults">{postersCount}</div>
                    </div>
                    <div className="bottomPill posters"></div>
                </div>
                <span className="updateViewAllText">

                </span>
            </div>
            {
                currentMediaFilter === "mostPopular" ? <MostPopular mostPopular={mostPopular} videoPlayerStatus={videoPlayerStatus} /> : currentMediaFilter === "videos" ? <Videos videos={videos} videoPlayerStatus={videoPlayerStatus} /> : currentMediaFilter === "backdrops" ? <Backdrops backdrops={backdrops} /> : <Posters posters={posters} />
            }
        </div>
    )
    }
    else return (
        <div className="social">
            <div className="socialMenu mediaOptions">
                <span className="socialHeading">Media</span>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('mostPopular')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Most Popular</div>
                    </div>
                    <div className="bottomPill mostPopular isMediaActive"></div>
                </div>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('videos')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Videos</div>
                        <div className="countResults">{videosCount}</div>
                    </div>
                    <div className="bottomPill videos"></div>
                </div>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('backdrops')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Backdrops</div>
                        <div className="countResults">{backdropsCount}</div>
                    </div>
                    <div className="bottomPill backdrops"></div>
                </div>
                <div className="socialOptions" onClick={(event) => toggleBottomPill('posters')}>
                    <div className="reviewsAndCount">
                        <div className="socialOptionText">Posters</div>
                        <div className="countResults">{postersCount}</div>
                    </div>
                    <div className="bottomPill posters"></div>
                </div>
                <span className="updateViewAllText">

                </span>
            </div>
        </div>
    )
}
export default Media;