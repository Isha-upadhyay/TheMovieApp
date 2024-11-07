import { CSSProperties } from "react";
import { getKeyValue } from "./helper";

interface Props {
    voteAverage: number,
    heightWidth: string,
    fontSize: string,
    offsetTop: string
}
function UserScore({ voteAverage, heightWidth, fontSize, offsetTop }: Props) {
    const dashArray = Math.PI * 100;
    const dashOffset = Math.PI * (100 - voteAverage);
    const barStrokeColors: Object = {
        rowRated: "#db2360",
        medRated: "#d2d531",
        hiRated: "#21d07a",
        none: ""
    };
    const trackStrokeColors: Object = {
        rowRated: "#571435",
        medRated: "#423d0f",
        hiRated: "#204529",
        none: ""
    };
    const scoreFontSize: CSSProperties = { fontSize: fontSize };
    const offset:CSSProperties={top:offsetTop};
    const styles: CSSProperties = { width: heightWidth, height: heightWidth };
    const barColor: string = voteAverage >= 75 ? getKeyValue(barStrokeColors, "hiRated") : voteAverage <= 25 ? getKeyValue(barStrokeColors, "rowRated") : getKeyValue(barStrokeColors, "medRated");
    const trackColor = voteAverage >= 75 ? getKeyValue(trackStrokeColors, "hiRated") : voteAverage <= 25 ? getKeyValue(trackStrokeColors, "rowRated") : getKeyValue(trackStrokeColors, "medRated");;
    return (
        <div className="userScore">
            <div className="track" style={styles}>
                <svg width={heightWidth} height={heightWidth} viewBox="0 0 100 100">
                    <circle cx="52.5" cy="52.5" r="50"
                        fill="transparent"
                        stroke={trackColor}
                        strokeWidth={6}
                        strokeDasharray={360}
                        className="userScoreSvg track"
                    />
                </svg>
            </div>
            <div className="bar" style={styles}>
                <svg width={heightWidth} height={heightWidth} viewBox="0 0 100 100" className="rotate">
                    <circle cx="52.5" cy="52.5" r="50"
                        fill="transparent"
                        stroke={barColor}
                        strokeWidth={6}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className="userScoreSvg bar"
                    />
                </svg>
            </div>
            <div className="displayRating">
                <span style={scoreFontSize}>
                    {voteAverage}
                    <span className="percentage" style={offset}>%</span>
                </span>
            </div>
        </div>
    )
}
export default UserScore;