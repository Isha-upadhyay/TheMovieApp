import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../styles/castcard.css'
import { ThemeContext, TitleTypeProp } from '../../AppContext';
import { useContext } from 'react';

interface Cast {
    name: string,
    characterName: string,
    castProfilePicture: string,
    total_episode_count?: number
}
interface Props {
    cast: Cast
}

function CastCard({ cast }: Props) {
    const { mediaType }: TitleTypeProp = useContext(ThemeContext);
    return (
        <div className="castCard">
            <div className="castProfilePicture">
                <LazyLoadImage className="castPic" src={cast.castProfilePicture} alt={cast.name} loading='lazy' />
            </div>
            <div className="castName">{cast.name}</div>
            <div className="characterName">{cast.characterName}</div>
            {
                mediaType === "tv" ?
                    <div className="episodeCount">{cast.total_episode_count} episodes</div>:null
            }
        </div>
    )
}
export default CastCard;