import * as React from 'react';
import './start.css';
import {Link} from 'react-router-dom';
import BackgroundFront from '../../assets/images/bomber.png';
import BackgroundBack from '../../assets/images/planet.png';
import {consts} from '../../consts';

export default function StartPage() {
    const gameTitle = consts.gamesTitle;
    const navLinkProfile = consts.startPage.navLinkProfile;
    const navLinkLeaderboard = consts.startPage.navLinkLeaderboard;
    const buttonPlay = consts.startPage.buttonPlay;

    return (
        <div className="start-page">
            <img src={BackgroundBack as string} className="start-page__background" alt="" />
            <img
                src={BackgroundFront as string}
                className="start-page__background-front"
                alt="BackgroundFront"
            />
            <ul className="start-page__leftSideNavi">
                <li className="start-page__navi-item">
                    <Link to="/profile" className="start-page__link">
                        {navLinkProfile}
                    </Link>
                </li>
                <li className="start-page__navi-item">
                    <Link to="/leaderboard" className="start-page__link">
                        {navLinkLeaderboard}
                    </Link>
                </li>
            </ul>
            <div className="start-page__container">
                <span className="start-page__games-title">{gameTitle}</span>
            </div>
            <div className="start-page__button-container">
                <Link to="/game" className="start-page__play-button">
                    {buttonPlay}
                </Link>
            </div>
        </div>
    );
}
