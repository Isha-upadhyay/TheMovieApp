function Footer() {
    return (
        <div className="footer">
            <div className="footerWrapper">
                <div className="footerList joinCommunity">
                    <div className="footerTMDBLogoDiv">
                        <img className="tmdbLogo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TheMovieDB"></img>
                    </div>
                    <div className="footerJoinButtonDiv">
                        <button className="joinCommunityButton">JOIN THE COMMUNITY</button>
                    </div>
                </div>
                <div className="footerList basics">
                    <ul className="footerList">
                        <li className="footer_list_item title">
                            THE BASICS
                        </li>
                        <li className="footer_list_item">
                            About TMDB
                        </li>
                        <li className="footer_list_item">
                            Contact Us
                        </li>
                        <li className="footer_list_item">
                            Support Forums
                        </li>
                        <li className="footer_list_item">
                            API
                        </li>
                        <li className="footer_list_item">
                            System Status
                        </li>
                    </ul>
                </div>
                <div className="footerList getInvolved">
                    <ul className="footerList">
                        <li className="footer_list_item title">
                            GET INVOLVED
                        </li>
                        <li className="footer_list_item">
                            Contribution Bible
                        </li>
                        <li className="footer_list_item">
                            Add New Movie
                        </li>
                        <li className="footer_list_item">
                            Add New TV Show
                        </li>
                    </ul>

                </div>
                <div className="footerList community">
                    <ul className="footerList">
                        <li className="footer_list_item title">
                            COMMUNITY
                        </li>
                        <li className="footer_list_item">
                            Guidelines
                        </li>
                        <li className="footer_list_item">
                            Discussions
                        </li>
                        <li className="footer_list_item">
                            Leaderboard
                        </li>
                        <li className="footer_list_item">
                            Twitter
                        </li>
                    </ul>

                </div>
                <div className="footerList legal">
                    <ul className="footerList">
                        <li className="footer_list_item title">
                            LEGAL
                        </li>
                        <li className="footer_list_item">
                            Terms of Use
                        </li>
                        <li className="footer_list_item">
                            API Terms of Use
                        </li>
                        <li className="footer_list_item">
                            Privacy Policy
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    )
}
export default Footer;