import * as React from 'react';
import './Message.css';
import {FC, useEffect, useState} from 'react';
import {TMessage} from '../../../server/controllers/forum';
import {getAnotherUserInfo} from '../../../services/api/user-api';
import {determineCreationDate} from '../../../utils/Utils';

/**
 * @param message сообщение из обсуждения.
 */
interface IProps {
    message: TMessage;
}

export const Message: FC<IProps> = ({message}) => {
    const [avatar, setAvatar] = useState('');
    const [login, setLogin] = useState('');

    useEffect(() => {
        getAnotherUserInfo(message.author_id).then((user) => {
            setAvatar(user.avatar);
            setLogin(user.login);
        });
    }, []);

    return (
        <>
            <img
                className="topic-page__message-author-image"
                src={avatar || 'https://freesvg.org/img/1514826571.png'}
                alt="author_image"
            />
            <p>
                [{determineCreationDate(message.createdAt)}] {login}: {message.text}
            </p>
        </>
    );
};
