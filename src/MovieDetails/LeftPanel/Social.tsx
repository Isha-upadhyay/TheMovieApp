import { useContext, useEffect, useState } from "react";
import Discussions from "./Discussions";
import Reviews from "./Reviews";
import { getKeyValue, options } from "../../helper";
import LandingPageSuspense from "../../LandingPage/LandingPageSuspense";
import { ThemeContext, TitleTypeProp } from "../../AppContext";

interface Props {
    titleID: string
}
export interface Review {
    author: string,
    avatar_path: string,
    rating: number,
    content: string,
    created_at: string,
    total_reviews: number
}
function Social({ titleID }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    const toggleBottomPill: Function = (selector: string) => {
        const reviewsPill: HTMLElement | null = document.querySelector(`.bottomPill.reviews`);
        const discussionsPill: HTMLElement | null = document.querySelector(`.bottomPill.discussions`);
        reviewsPill?.classList.toggle('isActive');
        discussionsPill?.classList.toggle('isActive');
    }
    const [movieReviews, setMovieReviews] = useState<Review | null>(null);
    const movieReviewsURL: string = `https://api.themoviedb.org/3/${mediaType}/${titleID}/reviews`;
    const getMovieReviews: Function = async (url: string, options: Object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const results: Array<Object> = getKeyValue(response, "results");
                const totalReviews: number = getKeyValue(response, "total_results");
                results.forEach((result: Object) => {
                    const author: string | undefined = getKeyValue(result, "author");
                    if (author !== undefined) {
                        const authorDetails: Object = getKeyValue(result, "author_details");
                        const rating: number | null = getKeyValue(authorDetails, "rating");
                        if (rating != null) {
                            const avatar_path: string = getKeyValue(authorDetails, "avatar_path");
                            let normalizedPath:string='';
                            if(avatar_path!=null)
                                normalizedPath = avatar_path?.includes("https") ? (avatar_path[0] !== '/' ? avatar_path : avatar_path.slice(1)) : "https://www.themoviedb.org/t/p/w64_and_h64_face" + avatar_path;
                            const reviewObject: Review = {
                                author: author,
                                avatar_path: normalizedPath,
                                rating: rating,
                                content: getKeyValue(result, "content"),
                                created_at: getKeyValue(result, "created_at"),
                                total_reviews: totalReviews
                            }
                            setMovieReviews(reviewObject);
                            return;
                        }
                    }
                })
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getMovieReviews(movieReviewsURL, options);
    }, [])
    if (movieReviews != null) {
        return (
            <div className="social">
                <div className="socialMenu">
                    <span className="socialHeading">Social</span>
                    <div className="socialOptions" onClick={(event) => toggleBottomPill()}>
                        <div className="reviewsAndCount">
                            <div className="socialOptionText">Reviews</div>
                            <div className="countResults">{movieReviews.total_reviews}</div>
                        </div>
                        <div className="bottomPill reviews isActive"></div>
                    </div>
                    <div className="socialOptions" onClick={(event) => toggleBottomPill()}>
                        <div className="reviewsAndCount">
                            <div className="socialOptionText">Discussions</div>
                        </div>
                        <div className="bottomPill discussions"></div>
                    </div>
                </div>
                <Reviews movieReviews={movieReviews} />
                <Discussions />
                <span className="fullCastNCrew">Read All Reviews</span>
            </div>
        )
    }
    else return (
        <>

        </>
    )
}
export default Social;