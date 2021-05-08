import * as React from 'react';
import './start.css';
import {consts} from '../../consts';
import BackgroundBack from '../../assets/images/planet.png';
import BackgroundFront from '../../assets/images/bomber.png';

export function StartPage() {
    return (
        <div className="start-page">
            <img src={BackgroundBack as string} className="backgroundBack" alt="BackgroudBack" />
            <img
                src={BackgroundFront as string}
                className="backgroundFront"
                alt="BackgroundFront"
            />
            <ul className="leftSideNavi">
                <li>
                    <a href="#">profile</a>
                </li>
                <li>
                    <a href="#">leaderboard</a>
                </li>
            </ul>
            <div className="container__games-title">
                <span className="games-title">{consts.gamesTitle}</span>
            </div>
            <div className="container__start-button">
                <a href="#" className="play-button">
                    {consts.startPage.buttonPlay}
                </a>
            </div>
        </div>
    );
}
