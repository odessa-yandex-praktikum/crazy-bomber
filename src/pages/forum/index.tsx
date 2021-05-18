import * as React from 'react';
import './forum.css';
import {Link, useHistory} from 'react-router-dom';
import ChatIcon from '../../assets/icons/chat.png';
import VoteIcon from '../../assets/icons/check-mark.png';
import BackLink from '../../components/backLink';
import {Button, EButtonColour, EButtonType} from '../../components/button';
import {consts} from '../../consts';
import {discussions} from '../../testdata/ForumData';
import {determineCreationDate, sortDescending} from '../../utils/Utils';

export default function Forum() {
    const pageTitle = consts.forumPage.pageTitle;
    const buttonCreateTopic = consts.forumPage.buttonCreateTopic;
    const buttonPrevious = consts.forumPage.buttonPrevious;
    const buttonNext = consts.forumPage.buttonNext;

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
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.FORUM_PAGE}
        />
    );

    const arrayButtons = [
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

    return (
        <div className="forum-page forum-page__background">
            <div className="container__page-title">
                <h2 className="page-title">{pageTitle}</h2>
            </div>
            <main className="container__page-content">
                <BackLink />
                <div className="forum-page__container">
                    <div className="forum-page_add-button">{createTopicButton}</div>
                    <ul className="forum-page__discussions-container">
                        {sortDescending(discussions).map((discussion) => (
                            <li className="forum-page__item" key={discussion.id}>
                                <Link
                                    to={`/forum/${discussion.id}`}
                                    className="forum-page__discussion"
                                >
                                    <div className="forum-page__discussion-content">
                                        <div className="forum-page__discussion-heading">
                                            <img
                                                className="forum-page__author-image"
                                                src={discussion.author.img}
                                                alt=""
                                            />
                                            <p className="forum-page__discussion-topic">
                                                {discussion.topic}
                                            </p>
                                        </div>
                                        <div className="forum-page__message-container">
                                            <p className="forum-page__last-message">
                                                {
                                                    discussion.messages[
                                                        discussion.messages.length - 1
                                                    ].message
                                                }
                                            </p>
                                        </div>
                                        <div className="forum-page__icons-container">
                                            <img
                                                src={ChatIcon as string}
                                                className="forum-page__icon forum-page__answers-icon"
                                                alt=""
                                            />
                                            <p className="forum-page__icon-text">
                                                {discussion.messages.length} answers
                                            </p>
                                            <img
                                                src={VoteIcon as string}
                                                className="forum-page__icon forum-page__votes-icon"
                                                alt=""
                                            />
                                            <p className="forum-page__icon-text">
                                                {discussion.votes} votes
                                            </p>
                                        </div>
                                        <div className="forum-page__discussion-content_created">
                                            <p className="forum-page__created-date">
                                                Asked {determineCreationDate(discussion.created)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="forum-page_buttons-container">{arrayButtons}</div>
                </div>
            </main>
        </div>
    );
}
