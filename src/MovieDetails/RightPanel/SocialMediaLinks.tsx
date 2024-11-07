import FacebookSVG from '../../assets/facebook-logo.svg'
import TwitterSVG from '../../assets/twitter-logo.svg'
import InstaSVG from '../../assets/insta-logo.svg'
import HomepageLinkSVG from '../../assets/homepage-link.svg'
import JustWatchSVG from '../../assets/justWatch.svg'
import '../../styles/socialMediaLinks.css'
import { OtherDetails } from './RightPanel'
import { useContext, useEffect, useState } from 'react'
import { getKeyValue, options } from '../../helper'
import { enableDropdown } from '../Movie/MovieOverview'
import { StreamingProvider } from '../TitleDetails'
import { ThemeContext, TitleTypeProp } from '../../AppContext'

interface ExternalLinks {
    facebook: string,
    twitter: string,
    instagram: string,
    homepage: string
}
interface Props {
    titleID: string,
    homepageLink: string,
    providers: StreamingProvider | undefined
}

function SocialMediaLinks({ titleID, homepageLink, providers }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    const externalLinksURL = `https://api.themoviedb.org/3/${mediaType}/${titleID}/external_ids`;
    const [externalLinks, setExternalLinks] = useState<ExternalLinks>({ facebook: '', twitter: '', instagram: '', homepage: homepageLink });

    const getExternalLinks: Function = async (url: string, options: Object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                let faceBookLink: string | undefined = undefined, twitterLink: string | undefined = undefined, instagramLink: string | undefined = undefined;
                getKeyValue(response, "facebook_id") !== undefined ? faceBookLink = "https://www.facebook.com/" + getKeyValue(response, "facebook_id") : faceBookLink = '';
                getKeyValue(response, "instagram_id") !== undefined ? instagramLink = "https://www.instagram.com/" + getKeyValue(response, "instagram_id") : instagramLink = '';
                getKeyValue(response, "twitter_id") !== undefined ? twitterLink = "https://www.twitter.com/" + getKeyValue(response, "twitter_id") : twitterLink = '';
                setExternalLinks({ facebook: faceBookLink, twitter: twitterLink, instagram: instagramLink, homepage: homepageLink });
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getExternalLinks(externalLinksURL, options);
    }, [])
    return (
        <div className="socialMediaLinks">
            {
                externalLinks.facebook !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-facebook')} onMouseOut={(event) => enableDropdown('options-facebook')}>
                        <a href={externalLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <img src={FacebookSVG} className="socialSVGLink" alt="visit facebook"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-facebook-tooltip">Visit Facebook</div>
                    </div> : null
            }
            {
                externalLinks.twitter !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-twitter')} onMouseOut={(event) => enableDropdown('options-twitter')}>
                        <a href={externalLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <img src={TwitterSVG} className="socialSVGLink" alt="Visit Twitter"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-twitter-tooltip">Visit Twitter</div>
                    </div> : null
            }
            {
                externalLinks.instagram !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-instagram')} onMouseOut={(event) => enableDropdown('options-instagram')}>
                        <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <img src={InstaSVG} className="socialSVGLink" alt="Visit Instagram"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-instagram-tooltip">Visit Instagram</div>
                    </div> : null
            }
            {
                providers !== undefined ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-justwatch')} onMouseOut={(event) => enableDropdown('options-justwatch')}>
                        <a href={providers.link} target="_blank" rel="noopener noreferrer">
                            <img src={JustWatchSVG} className="socialSVGLink homepage justWatch" alt="Visit Justwatch"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-justwatch-tooltip">Visit JustWatch</div>
                    </div> : null
            }
            {
                externalLinks.homepage !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-homepage')} onMouseOut={(event) => enableDropdown('options-homepage')}>
                        <a href={externalLinks.homepage} target="_blank" rel="noopener noreferrer">
                            <img src={HomepageLinkSVG} className="socialSVGLink homepage" alt="Visit Homepage"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-homepage-tooltip">Visit Homepage</div>
                    </div> : null
            }
        </div>
    )
}
export default SocialMediaLinks;