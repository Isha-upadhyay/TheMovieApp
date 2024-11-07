import PlusIcon from '../assets/plus_icon.svg'


function Header() {
    const enableDropdown: Function = (listActionToToggle: string) => {
        const dropdownListToToggle: HTMLElement | null = document.getElementById(`${listActionToToggle}-actions`);
        dropdownListToToggle?.classList.toggle("displayActions")
    }
    return (
        <div className="header">
            <div id="loading-bar"></div>
            <div className="navbarWrapper">
                <div className="navbar" aria-label="landing page navbar">
                    <a href="/" className="movieDBLogo">
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TheMovieDB"></img>
                    </a>
                    <div className="navbarMenu">
                        <ul className="navbar_menu_list" aria-label="navbar list">
                            <li className="navbar_menu_list_item" id="navbar-movies" aria-label="navbar list item" onMouseOver={(event) => enableDropdown('navbar-movies')} onMouseOut={(event) => enableDropdown('navbar-movies')}>
                                <div className="list_item_title">
                                    Movies
                                </div>
                                <div className="list_item_dropdown_actions" id="navbar-movies-actions">
                                    <ul className="navbar_list_dropdown_actions">
                                        <li className="dropdown_action">
                                            Popular
                                        </li>
                                        <li className="dropdown_action">
                                            Now Playing
                                        </li>
                                        <li className="dropdown_action">
                                            Upcoming
                                        </li>
                                        <li className="dropdown_action">
                                            Top Rated
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="navbar_menu_list_item moreWidth" id="navbar-shows" aria-label="navbar list item" onMouseOver={(event) => enableDropdown('navbar-shows')} onMouseOut={(event) => enableDropdown('navbar-shows')}>
                                <div className="list_item_title">
                                    TV Shows
                                </div>
                                <div className="list_item_dropdown_actions" id="navbar-shows-actions">
                                    <ul className="navbar_list_dropdown_actions">
                                        <li className="dropdown_action">
                                            Popular
                                        </li>
                                        <li className="dropdown_action">
                                            Airing Today
                                        </li>
                                        <li className="dropdown_action">
                                            On TV
                                        </li>
                                        <li className="dropdown_action">
                                            Top Rated
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="navbar_menu_list_item" id="navbar-people" aria-label="navbar list item" onMouseOver={(event) => enableDropdown('navbar-people')} onMouseOut={(event) => enableDropdown('navbar-people')}>
                                <div className="list_item_title">
                                    People
                                </div>
                                <div className="list_item_dropdown_actions" id="navbar-people-actions">
                                    <ul className="navbar_list_dropdown_actions">
                                        <li className="dropdown_action">
                                            Popular People
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="navbar_menu_list_item" id="navbar-more" aria-label="navbar list item" onMouseOver={(event) => enableDropdown('navbar-more')} onMouseOut={(event) => enableDropdown('navbar-more')}>
                                <div className="list_item_title">
                                    More
                                </div>
                                <div className="list_item_dropdown_actions" id="navbar-more-actions">
                                    <ul className="navbar_list_dropdown_actions">
                                        <li className="dropdown_action">
                                            Discussions
                                        </li>
                                        <li className="dropdown_action">
                                            Leaderboard
                                        </li>
                                        <li className="dropdown_action">
                                            Support
                                        </li>
                                        <li className="dropdown_action">
                                            API
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="otheractions" aria-label="navbar other actions">
                    <ul className="otheractions_list" aria-label="navbar other action items">
                        <li className="otheractions_list_item" aria-label="navbar other action item">
                            <img src={PlusIcon} className="plusIcon" alt="add new movie/tv show"></img>
                        </li>
                        <li className="otheractions_list_item siteLanguage" aria-label="navbar other action item">
                            EN
                        </li>
                        <li className="otheractions_list_item" aria-label="navbar other action item">
                            Login
                        </li>
                        <li className="otheractions_list_item" aria-label="navbar other action item">
                            Join TMDB
                        </li>
                        <li className="otheractions_list_item" aria-label="navbar other action item">
                            <img className="searchIcon" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" alt="search tmdb"></img>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
export default Header;