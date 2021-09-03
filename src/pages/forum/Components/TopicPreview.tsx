import LikeIcon from 'assets/icons/like.png';
import React, {useEffect, useState} from 'react';
import './TopicPreview.css';
import {FC} from 'react';
import {Link} from 'react-router-dom';
import {TTopic} from '../../../server/controllers/forum';
import {getAnotherUserInfo} from '../../../services/api/user-api';
import {determineCreationDate} from '../../../utils/Utils';

/**
 * @param topic Тема.
 */
export type TDiscussionProps = {
    topic: TTopic;
};

/**
 * Компонент краткого просмотра темы.
 */
export const TopicPreview: FC<TDiscussionProps> = ({topic}) => {
    const [avatar, setAvatar] = useState();
    const [login, setLogin] = useState('');

    useEffect(() => {
        getAnotherUserInfo(topic.author_id).then((user) => {
            setAvatar(user.avatar);
            setLogin(user.login);
        });
    }, []);

    return (
        <Link to={`/crazy-forum/${topic.id}`} className="topic-preview">
            <div className="topic-preview__container">
                <img
                    className="topic-preview__author-avatar"
                    src={avatar || 'https://freesvg.org/img/1514826571.png'}
                    alt="author_image"
                />
                <div className="topic-preview__body">
                    <h3 className="topic-preview__title">
                        {login}: {topic.title}
                    </h3>
                    <div className="topic-preview__text">{topic.text}</div>
                    <div className="topic-preview__body-bottom">
                        <div className="topic-preview__likes-container">
                            <img
                                src={LikeIcon as string}
                                className="topic-preview__likes-icon"
                                alt="vote_icon"
                            />
                            <p className="topic-preview__likes-count">{topic.likes} likes</p>
                        </div>
                        <p className="topic-preview__created-date">
                            Asked {determineCreationDate(topic.createdAt)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};
