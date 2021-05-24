import * as React from 'react';
import './leaderboard.css';
import {BackLink} from '../../components/backLink';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {convertScoreToString, findFiveLeaders} from '../../utils/Utils';

export default function LeaderboardPage() {
    const players = [
        {id: 1, img: 'https://freesvg.org/img/1514826571.png', login: 'useruseruser', score: 123},
        {id: 2, img: 'https://freesvg.org/img/1514826571.png', login: 'user2', score: 229},
        {id: 3, img: 'https://freesvg.org/img/1514826571.png', login: 'user3', score: 111},
        {id: 4, img: 'https://freesvg.org/img/1514826571.png', login: 'user4', score: 228},
        {id: 5, img: 'https://freesvg.org/img/1514826571.png', login: 'user5', score: 109},
    ];
    const pageTitle = consts.leaderBoardPage.pageTitle;
    const loginHeader = consts.leaderBoardPage.loginHeader;
    const scoreHeader = consts.leaderBoardPage.scoreHeader;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkForum = consts.navigation.navLinkForum;
    const navLinkLogout = consts.navigation.navLinkLogout;

    const navigationItems = [navLinkStart, navLinkProfile, navLinkForum, navLinkLogout];

    return (
        <div className="leaderboard-page leaderboard-page__background">
            <div className="container__left-part">
                <Navigation navigationItems={navigationItems} />
                <BackLink />
            </div>
            <div className="container__right-part">
                <div className="container__page-title">
                    <h2 className="page-title">{pageTitle}</h2>
                </div>
                <main className="container__page-content">
                    <div className="leaderboard-page__table">
                        <div className="leaderboard-page__table-grid">
                            <span className="leaderboard-page__table-col" />
                            <span className="leaderboard-page__table-col" />
                            <span className="leaderboard-page__table-col">
                                <strong>{loginHeader}</strong>
                            </span>
                            <span className="leaderboard-page__table-col">
                                <strong>{scoreHeader}</strong>
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
                                    <span className="leaderboard-page__table-col">
                                        {player.login}
                                    </span>
                                    <span className="leaderboard-page__table-col">
                                        {convertScoreToString(player.score)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
