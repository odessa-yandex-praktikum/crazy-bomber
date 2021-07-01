import * as React from 'react';
import './forum.css';
import {BackLink} from '../../components/backLink';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {DiscussionItem} from '../../components/discussion';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {discussions} from '../../testdata/ForumData';
import {sortDescending} from '../../utils/Utils';

export default function Forum() {
    const pageTitle = consts.forumPage.pageTitle;
    const buttonCreateTopic = consts.forumPage.buttonCreateTopic;
    const buttonPrevious = consts.forumPage.buttonPrevious;
    const buttonNext = consts.forumPage.buttonNext;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;

    //TODO: задачи для реализации функционала форума: добавление новой темы, показ предыдущих, следующих тем и сообщений, поиск по теме
    // const [disabledPreviousBtn, setDisabledPreviousBtn] = useState(true);
    // const [disabledNextBtn, setDisabledNextBtn] = useState(false);
    // const showPreviousTopics = () => {};
    // const showNextTopics = () => {};
    // const createNewTopic = () => {};

    const createTopicButton = (
        <Button
            key={buttonCreateTopic}
            text={buttonCreateTopic}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORUM_PAGE}
        />
    );

    const arrayButtons = [
        <Button
            key={buttonPrevious}
            text={buttonPrevious}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORUM_PAGE}
        />,
        <Button
            key={buttonNext}
            text={buttonNext}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORUM_PAGE}
        />,
    ];

    const navigationItems = [navLinkStart, navLinkProfile, navLinkLeaderboard, navLinkLogout];

    return (
        <div className="forum-page forum-page__background">
            <div className="container__left-part">
                <Navigation navigationItems={navigationItems} />
                <BackLink />
            </div>
            <div className="container__right-part">
                <div className="container__page-title">
                    <h2 className="page-title">{pageTitle}</h2>
                </div>
                <main className="container__page-content">
                    <div className="forum-page__container">
                        <div className="forum-page__add-button">{createTopicButton}</div>
                        <ul className="forum-page__discussions-container">
                            {sortDescending(discussions).map((discussion) => (
                                <DiscussionItem discussion={discussion} key={discussion.id} />
                            ))}
                        </ul>
                        <div className="forum-page__buttons-container">{arrayButtons}</div>
                    </div>
                </main>
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
