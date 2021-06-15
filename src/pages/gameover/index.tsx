import * as React from 'react';
import './gameover.css';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {convertScoreToString} from '../../utils/Utils';

type LocationState = {
    currentScore: number;
    isWinner: boolean;
};

export default function GameoverPage() {
    const {titleLose, titleWin, scoreText, buttonPlayAgain} = consts.gameover;
    const {navLinkForum, navLinkProfile, navLinkLeaderboard} = consts.navigation;

    const {state} = useLocation<LocationState>();
    const {currentScore, isWinner} = state;
    const navigationItems = [navLinkForum, navLinkProfile, navLinkLeaderboard];

    return (
        <div
            className={
                'gameover-page ' +
                (isWinner ? 'gameover-page__win-background' : 'gameover-page__lose-background')
            }
        >
            <div className="container__left-part">
                <Navigation navigationItems={navigationItems} />
            </div>
            <div className="container__right-part">
                <div className="gameover-page__container">
                    <h2 className="gameover-page__title">{isWinner ? titleWin : titleLose}</h2>
                    <Link to="/game" className="gameover-page__play-button">
                        {buttonPlayAgain}
                    </Link>
                </div>
                <span className="gameover-page__score">
                    {scoreText}
                    {convertScoreToString(currentScore)}
                </span>
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
