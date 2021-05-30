import * as React from 'react';
import './start.css';
import {Link} from 'react-router-dom';
import BackgroundFront from '../../assets/images/bomber.png';
import BackgroundBack from '../../assets/images/planet.png';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';

export default function StartPage() {
    const gameTitle = consts.gamesTitle;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkForum = consts.navigation.navLinkForum;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogin = consts.navigation.navLinkLogin;
    const buttonPlay = consts.startPage.buttonPlay;

    const navigationItems = [navLinkProfile, navLinkForum, navLinkLeaderboard, navLinkLogin];

    return (
        <div className="start-page">
            <img src={BackgroundBack as string} className="start-page__background" alt="" />
            <img
                src={BackgroundFront as string}
                className="start-page__background-front"
                alt="BackgroundFront"
            />
            <Navigation navigationItems={navigationItems} />
            <div className="start-page__container">
                <span className="start-page__games-title">{gameTitle}</span>
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
