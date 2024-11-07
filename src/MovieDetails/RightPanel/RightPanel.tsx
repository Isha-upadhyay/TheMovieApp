import Keywords from "./Keywords";
import OtherTitleDetails from "../Movie/OtherMovieDetails";
import SocialMediaLinks from "./SocialMediaLinks";
import '../../styles/rightpanel.css'
import { useEffect, useState } from "react";
import { getKeyValue, options } from "../../helper";
import { StreamingProvider } from "../TitleDetails";

export interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}

interface Props {
    otherTitleDetails: OtherDetails | undefined,
    titleID: string,
    providers: StreamingProvider | undefined
}

function RightPanel({ otherTitleDetails, titleID, providers }: Props) {
    if (otherTitleDetails != null) {
        const formatDollars: Function = (amount: number): string => {
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        const languageCode: string = otherTitleDetails?.original_language;
        const languageCodeToEnglish = new Intl.DisplayNames(['en'], { type: 'language' }).of(languageCode);
        return (
            <div className="rightPanel">
                <section className="titleFacts">
                    <SocialMediaLinks titleID={titleID} homepageLink={otherTitleDetails.homepage} providers={providers} />
                    <div className="titleStatus">
                        <div className="status">
                            <span><b>Status</b></span>
                            <span>{otherTitleDetails?.status}</span>
                        </div>
                        <div className="originalLanguage">
                            <span><b>Original Language</b></span>
                            <span>{languageCodeToEnglish}</span>
                        </div>
                        <div className="budget">
                            <span><b>Budget</b></span>
                            <span>{formatDollars(otherTitleDetails?.budget)}</span></div>
                        <div className="revenue">
                            <span><b>Revenue</b></span>
                            <span>{formatDollars(otherTitleDetails?.revenue)}</span></div>
                    </div>
                    <Keywords titleID={titleID} />
                </section>
                <section className="contentScoreSection">
                    <div className="contentScore">
                        <span className="contentScoreText">Content Score</span>
                        <div className="score">
                            100
                        </div>
                        <span className="looksGood">Yes! Looking good!</span>
                    </div>
                </section>
                <section className="contributors">

                </section>
            </div>
        )
    }
    else { return (<></>) }
}
export default RightPanel;