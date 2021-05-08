import * as React from 'react';
import './leaderboard.css';
import {consts} from '../../consts';
import BackgroundBack from '../../assets/images/planet.png';

export function Leaderboard() {
    const players = [
        {id: 1, img: 'https://freesvg.org/img/1514826571.png', login: 'user1', score: '0000123'},
        {id: 2, img: 'https://freesvg.org/img/1514826571.png', login: 'user2', score: '0000229'},
        {id: 3, img: 'https://freesvg.org/img/1514826571.png', login: 'user3', score: '0000111'},
        {id: 4, img: 'https://freesvg.org/img/1514826571.png', login: 'user4', score: '0000228'},
        {id: 5, img: 'https://freesvg.org/img/1514826571.png', login: 'user5', score: '0000109'},
    ];

    return (
        <div className="leaderboard-page">
            <img src={BackgroundBack as string} className="backgroundBack" alt="" />
            <div className="container__page-title">
                <h2 className="page-title">{consts.leaderBoardPage.pageTitle}</h2>
            </div>
            <main className="container__page-content">
                <a href="#" className="backlink">
                    {consts.leaderBoardPage.linkBack}
                </a>
                <div className="container__leaderboard__table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col-2" />
                                <th scope="col-2" />
                                <th scope="col-4" className="text-center">
                                    {consts.leaderBoardPage.loginHeader}
                                </th>
                                <th scope="col-4" className="text-center">
                                    {consts.leaderBoardPage.scoreHeader}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {players
                                .sort(
                                    (player1, player2) =>
                                        Number(player2.score) - Number(player1.score)
                                )
                                .slice(0, 5)
                                .map((player, index) => (
                                    <tr className="table__row" key={player.id}>
                                        <td className="align-middle text-center px-4">
                                            {index + 1}
                                        </td>
                                        <td className="table__row__image">
                                            <img src={player.img} alt="" />
                                        </td>
                                        <td className="align-middle text-center">{player.login}</td>
                                        <td className="align-middle text-center">{player.score}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
