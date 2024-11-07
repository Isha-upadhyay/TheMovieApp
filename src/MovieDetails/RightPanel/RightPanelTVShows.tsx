import Keywords from "./Keywords";
import OtherTitleDetails from "../Movie/OtherMovieDetails";
import SocialMediaLinks from "./SocialMediaLinks";
import '../../styles/rightpanel.css'
import { useContext, useEffect, useState } from "react";
import { getKeyValue, options } from "../../helper";
import { StreamingProvider, TVDetails } from "../TitleDetails";

export interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}

interface Props {
    titleInfo: TVDetails,
    titleID: string,
    providers: StreamingProvider | undefined
}

function RightPanelTVShows({titleInfo, titleID, providers }: Props) {
    if (titleInfo !== undefined) {
        const formatDollars: Function = (amount: number): string => {
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        const languageCode: string = titleInfo.original_language;
        const languageCodeToEnglish = new Intl.DisplayNames(['en'], { type: 'language' }).of(languageCode);
        return (
            <div className="rightPanel">
                <section className="titleFacts">
                    <SocialMediaLinks titleID={titleID} homepageLink={titleInfo.homepage} providers={providers} />
                    <div className="titleStatus">
                        <div className="status">
                            <span><b>Status</b></span>
                            <span>{titleInfo?.status}</span>
                        </div>
                        <div className="network">
                            <span><b>Network</b></span>
                            <img src={titleInfo.network_logo} className="networkLogo" alt="network provider"></img>
                        </div>
                        <div className="type">
                            <span><b>Type</b></span>
                            <span>{titleInfo.type}</span>
                        </div>
                        <div className="originalLanguage">
                            <span><b>Original Language</b></span>
                            <span>{languageCodeToEnglish}</span>
                        </div>
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
export default RightPanelTVShows;