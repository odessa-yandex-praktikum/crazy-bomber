import * as React from 'react';
import './leaderboard.css';
import {Link} from 'react-router-dom';
import BackgroundBack from '../../assets/images/planet.png';
import {consts} from '../../consts';
import {convertScoreToString, findFiveLeaders} from '../../utils/Utils';

export default function LeaderboardPage() {
    const players = [
        {id: 1, img: 'https://freesvg.org/img/1514826571.png', login: 'user1', score: 123},
        {id: 2, img: 'https://freesvg.org/img/1514826571.png', login: 'user2', score: 229},
        {id: 3, img: 'https://freesvg.org/img/1514826571.png', login: 'user3', score: 111},
        {id: 4, img: 'https://freesvg.org/img/1514826571.png', login: 'user4', score: 228},
        {id: 5, img: 'https://freesvg.org/img/1514826571.png', login: 'user5', score: 109},
    ];

    return (
        <div className="leaderboard-page">
            <img src={BackgroundBack as string} className="leaderboard-page__background" alt="" />
            <div className="container__page-title">
                <h2 className="page-title">{consts.leaderBoardPage.pageTitle}</h2>
            </div>
            <main className="container__page-content">
                <Link to="/start" className="backlink">
                    {consts.leaderBoardPage.linkBack}
                </Link>
                <div className="leaderboard-page__table">
                    <div className="leaderboard-page__table-grid">
                        <span className="leaderboard-page__table-col" />
                        <span className="leaderboard-page__table-col" />
                        <span className="leaderboard-page__table-col">
                            <strong>{consts.leaderBoardPage.loginHeader}</strong>
                        </span>
                        <span className="leaderboard-page__table-col">
                            <strong>{consts.leaderBoardPage.scoreHeader}</strong>
                        </span>
                        {findFiveLeaders(players).map((player, index) => (
                            <div className="leaderboard-page__table-row" key={player.id}>
                                <span className="leaderboard-page__table-col">{index + 1}</span>
                                <span className="leaderboard-page__table-col">
                                    <img
                                        src={player.img}
                                        className="leaderboard-page__table-image"
                                        alt=""
                                    />
                                </span>
                                <span className="leaderboard-page__table-col">{player.login}</span>
                                <span className="leaderboard-page__table-col">
                                    {convertScoreToString(player.score)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
