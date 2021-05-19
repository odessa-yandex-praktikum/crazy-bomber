import * as React from 'react';
import './discussion.css';
import {FC} from 'react';
import {Link} from 'react-router-dom';
import ChatIcon from '../../assets/icons/chat.png';
import VoteIcon from '../../assets/icons/check-mark.png';
import {determineCreationDate, Discussion} from '../../utils/Utils';

/**
 * @param discussion обсуждение
 * @param key атрибут элементов списка
 */
export type TDiscussionProps = {
    discussion: Discussion;
};

type Props = FC<TDiscussionProps>;

export const DiscussionItem: Props = ({discussion}: TDiscussionProps) => {
    return (
        <li className="forum-page__item">
            <Link to={`/forum/${discussion.id}`} className="forum-page__discussion">
                <div className="forum-page__discussion-content">
                    <div className="forum-page__discussion-heading">
                        <img
                            className="forum-page__author-image"
                            src={discussion.author.img}
                            alt=""
                        />
                        <p className="forum-page__discussion-topic">{discussion.topic}</p>
                    </div>
                    <div className="forum-page__message-container">
                        <p className="forum-page__last-message">
                            {discussion.messages[discussion.messages.length - 1].message}
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
                        <p className="forum-page__icon-text">{discussion.votes} votes</p>
                    </div>
                    <div className="forum-page__discussion-content_created">
                        <p className="forum-page__created-date">
                            Asked {determineCreationDate(discussion.created)}
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
};
