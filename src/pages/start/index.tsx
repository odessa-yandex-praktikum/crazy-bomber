import * as React from 'react';
import './start.css';
import {Link} from 'react-router-dom';
import BackgroundFront from '../../assets/images/bomber.png';
import BackgroundBack from '../../assets/images/planet.png';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';

export default function StartPage() {
    const gameTitle = consts.gamesTitle;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkForum = consts.navigation.navLinkForum;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;
    const buttonPlay = consts.startPage.buttonPlay;

    const navigationItems = [navLinkProfile, navLinkForum, navLinkLeaderboard, navLinkLogout];

    return (
        <div className="start-page">
            <img src={BackgroundBack as string} className="backgroundBack" alt="BackgroundBack" />
            <img
                src={BackgroundFront as string}
                className="backgroundFront"
                alt="BackgroundFront"
            />
            <Navigation navigationItems={navigationItems} />
            <div className="container__games-title">
                <span className="games-title">{gameTitle}</span>
            </div>
            <div className="start-page__button-container">
                <Link to="/game" className="start-page__play-button">
                    {buttonPlay}
                </Link>
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
