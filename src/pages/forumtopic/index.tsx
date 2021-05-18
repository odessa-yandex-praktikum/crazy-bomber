import * as React from 'react';
import './forumtopic.css';
import {RouteComponentProps} from 'react-router-dom';
import BackLink from '../../components/backLink';
import {Button, EButtonColour, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {consts} from '../../consts';
import {discussions} from '../../testdata/ForumData';
import {determineCreationDate, Discussion} from '../../utils/Utils';

type TParams = {id: string};

export default function ForumTopic({match}: RouteComponentProps<TParams>) {
    const pageTitle = consts.forumPage.pageTitle;
    const buttonPrevious = consts.forumPage.buttonPrevious;
    const buttonNext = consts.forumPage.buttonNext;
    const messageInput = consts.forumPage.messageInput;

    const previousNextButtons = [
        <Button
            key={buttonPrevious}
            text={buttonPrevious}
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.FORUM_PAGE}
        />,
        <Button
            key={buttonNext}
            text={buttonNext}
            buttonColour={EButtonColour.PRIMARY}
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
            className="forum-page__form-input"
        />,
    ];

    const discussion: Discussion = discussions.find(
        (discussion) => discussion.id === Number(match.params.id)
    );
    const {topic, messages} = discussion;

    return (
        <div className="forum-page forum-page__background">
            <div className="container__page-title">
                <h2 className="page-title">{pageTitle}</h2>
            </div>
            <main className="container__page-content">
                <BackLink />
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
                            <div className="forum-page_buttons-container">
                                {previousNextButtons}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
