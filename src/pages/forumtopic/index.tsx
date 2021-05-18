import * as React from 'react';
import './forumtopic.css';
import {RouteComponentProps} from 'react-router-dom';
import BackLink from '../../components/backLink';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {Navi, TNaviItem} from '../../components/navi';
import {consts} from '../../consts';
import {discussions} from '../../testdata/ForumData';
import {createNaviPath, determineCreationDate, Discussion} from '../../utils/Utils';

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
            className="forum-page__input"
        />,
    ];

    const discussion: Discussion = discussions.find(
        (discussion) => discussion.id === Number(match.params.id)
    );
    const {topic, messages} = discussion;

    const arrayNaviItems = [
        new TNaviItem(navLinkStart, createNaviPath(navLinkStart)),
        new TNaviItem(navLinkProfile, createNaviPath(navLinkProfile)),
        new TNaviItem(navLinkLeaderboard, createNaviPath(navLinkLeaderboard)),
        new TNaviItem(navLinkLogout, createNaviPath(navLinkLogout)),
    ];

    return (
        <div className="forum-page forum-page__background">
            <div className="container__left-part">
                <Navi arrayNaviItems={arrayNaviItems} />
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
                                    <li className="forum-page__item" key={message.created}>
                                        <div className="forum-page__topic-message">
                                            <img
                                                className="forum-page__author-image"
                                                src={message.author.img}
                                                alt=""
                                            />
                                            <p className="forum-page__discussion-message">
                                                {message.message}
                                            </p>
                                        </div>
                                        <div className="forum-page__discussion-content_created">
                                            <p className="forum-page__created-date">
                                                Left {determineCreationDate(message.created)}
                                            </p>
                                        </div>
                                    </li>
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
        </div>
    );
}
