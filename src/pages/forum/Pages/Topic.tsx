import './Topic.css';
import LikeIcon from 'assets/icons/like.png';
import {BackLink} from 'components/backLink';
import {Button, EButtonColor, EButtonType} from 'components/button';
import {EFullScreenPosition, FullScreen} from 'components/full-screen';
import {Input} from 'components/input';
import {Navigation} from 'components/navigation';
import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {consts} from '../../../consts';
import {useActions} from '../../../hooks/use-actions';
import {getAnotherUserInfo} from '../../../services/api/user-api';
import {ForumActions} from '../../../store/actions/forumActions';
import {useTypedSelector} from '../../../store/hooks/useTypedSelector';
import {Message} from '../Components/Message';

type TParams = {id: string};

export default function Topic({match}: RouteComponentProps<TParams>) {
    const forumActions = useActions(ForumActions);
    const [text, setText] = useState('');
    const [avatar, setAvatar] = useState('');
    const [login, setLogin] = useState('');

    const {theme = 'GREY'} = useTypedSelector((state) => state.user);
    const {topic, messages} = useTypedSelector((state) => state.forum);

    const pageTitle = consts.forumPage.pageTitle;
    const messageInput = consts.forumPage.messageInput;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;

    useEffect(() => {
        forumActions.getTopicById(Number(match.params.id)).then(({author_id}) => {
            getAnotherUserInfo(author_id).then((user) => {
                setAvatar(user.avatar);
                setLogin(user.login);
            });
        });
        forumActions.getAllTopicMessagesById(Number(match.params.id));
    }, []);

    /**
     * Обработчик ответа в теме.
     */
    const handleReplyToTopic = () => {
        forumActions.replyToTopicById({text, id: Number(match.params.id)});
    };

    /**
     * Обработчик лайка темы.
     */
    const handleLikeTopic = () => {
        forumActions.likeTopicById(Number(match.params.id));
    };

    const navigationItems = [navLinkStart, navLinkProfile, navLinkLeaderboard, navLinkLogout];

    return (
        <div className="base-page base-page__background">
            <div className="container__left-part">
                <Navigation navigationItems={navigationItems} />
                <BackLink />
            </div>
            <div className="container__right-part">
                <div className="container__page-title">
                    <h2 className="page-title">{pageTitle}</h2>
                </div>
                <main className="container__page-content">
                    <div className={`topic-page__container container__theme-${theme}`}>
                        <div className="topic-page__header">
                            <div className="topic-page__author-image-container">
                                <img
                                    className="topic-page__author-image"
                                    src={avatar || 'https://freesvg.org/img/1514826571.png'}
                                    alt="author_image"
                                />
                                <div>{login}</div>
                            </div>
                            <div>
                                <p>{topic?.title}</p>
                                <p className="topic-page__text">{topic?.text}</p>
                            </div>
                        </div>
                        <div className="topic-page__body">
                            {messages && (
                                <ul className="topic-page__topic">
                                    {messages.map((message) => (
                                        <li
                                            className="topic-page__message-container"
                                            key={message.id}
                                        >
                                            <Message message={message} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="topic-page__footer">
                            <Input
                                key={messageInput}
                                nameField={messageInput}
                                type="text"
                                name={messageInput}
                                textError=""
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                            />
                            <div className="topic-page__footer-second">
                                <div
                                    className="topic-page__likes-container"
                                    onClick={handleLikeTopic}
                                >
                                    <div>{topic?.likes}</div>
                                    <img
                                        src={LikeIcon as string}
                                        className="topic-page__likes-icon"
                                        alt="vote_icon"
                                    />
                                    <div>likes</div>
                                </div>
                                <Button
                                    key="reply"
                                    text="reply"
                                    buttonColor={EButtonColor.PRIMARY}
                                    buttonType={EButtonType.FORUM_PAGE}
                                    onClick={handleReplyToTopic}
                                    disabled={!text}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
