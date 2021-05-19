import * as React from 'react';
import './message.css';
import {FC} from 'react';
import {determineCreationDate, Message} from '../../utils/Utils';

/**
 * @param message сообщение из обсуждения
 * @param key атрибут элементов списка
 */
export type TMessageProps = {
    message: Message;
};

type Props = FC<TMessageProps>;

export const MessageItem: Props = ({message}) => {
    return (
        <li className="forum-page__item">
            <div className="forum-page__topic-message">
                <img
                    className="forum-page__author-image"
                    src={message.author.img}
                    alt="author_image"
                />
                <p className="forum-page__discussion-message">{message.message}</p>
            </div>
            <div className="forum-page__discussion-content_created">
                <p className="forum-page__created-date">
                    Left {determineCreationDate(message.created)}
                </p>
            </div>
        </li>
    );
};
