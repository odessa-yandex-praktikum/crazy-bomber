import * as React from 'react';
import './forumtopic.css';
import {RouteComponentProps} from 'react-router-dom';
import {BackLink} from 'Components/backLink';
import {Button, EButtonColor, EButtonType} from 'Components/button';
import {Form} from 'Components/form';
import {EFullScreenPosition, FullScreen} from 'Components/full-screen';
import {Input} from 'Components/input';
import {MessageItem} from 'Components/message';
import {Navigation} from 'Components/navigation';
import {consts} from '../../consts';
import {discussions} from '../../testdata/ForumData';
import {Discussion} from '../../utils/Utils';

type TParams = {id: string};

export default function ForumTopic({match}: RouteComponentProps<TParams>) {
    const pageTitle = consts.forumPage.pageTitle;
    const buttonPrevious = consts.forumPage.buttonPrevious;
    const buttonNext = consts.forumPage.buttonNext;
    const messageInput = consts.forumPage.messageInput;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;

    const previousNextButtons = [
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
    const arrayInputs = [
        <Input
            key={messageInput}
            nameField={messageInput}
            type="text"
            name={messageInput}
            textError=""
        />,
    ];

    const discussion: Discussion | undefined = discussions.find(
        (discussion) => discussion.id === Number(match.params.id)
    );
    const {topic, messages} = discussion!;

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
                        <p className="forum-page_topic-title">{topic}</p>
                        <div className="forum-page__topic">
                            <ul className="forum-page__item-list">
                                {messages.map((message) => (
                                    <MessageItem message={message} key={message.created} />
                                ))}
                            </ul>
                            <div className="forum-page_topic-footer">
                                <Form classForm="forum-page__form" arrayInputs={arrayInputs} />
                                <div className="forum-page__buttons-container">
                                    {previousNextButtons}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
