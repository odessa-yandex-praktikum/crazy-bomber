import {EFullScreenPosition, FullScreen} from 'components/full-screen';
import {Navigation} from 'components/navigation';
import * as React from 'react';
import '../../common.css';
import {Link} from 'react-router-dom';
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
        <div className="page-with-bomber">
            <Navigation navigationItems={navigationItems} />
            <span className="games-title">{gameTitle}</span>
            <Link to="/game" className="play-button">
                {buttonPlay}
            </Link>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
