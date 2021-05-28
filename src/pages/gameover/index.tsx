import * as React from 'react';
import './gameover.css';
import {Link} from 'react-router-dom';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {convertScoreToString} from '../../utils/Utils';

export default function GameoverPage() {
    const title = consts.gameover.title;
    const scoreText = consts.gameover.scoreText;
    const buttonPlayAgain = consts.gameover.buttonPlayAgain;
    const navLinkForum = consts.navigation.navLinkForum;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const currentScore = 125; //тестовое значение, после подключения Redux можно хранить финальное значение для текущей игры в store

    const navigationItems = [navLinkForum, navLinkProfile, navLinkLeaderboard];

    return (
        <div className="gameover-page gameover-page__background">
            <div className="container__left-part">
                <Navigation navigationItems={navigationItems} />
            </div>
            <div className="container__right-part">
                <div className="gameover-page__container">
                    <h2 className="gameover-page__title">{title}</h2>
                    <Link to="/game" className="gameover-page__play-button">
                        {buttonPlayAgain}
                    </Link>
                </div>
                <span className="gameover-page__score">
                    {scoreText}
                    {convertScoreToString(currentScore)}
                </span>
            </div>
        </div>
    );
}
