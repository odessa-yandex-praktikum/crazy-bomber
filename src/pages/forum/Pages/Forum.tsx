import './Forum.css';
import {BackLink} from 'components/backLink';
import {Button, EButtonColor, EButtonType} from 'components/button';
import {EFullScreenPosition, FullScreen} from 'components/full-screen';
import {Input} from 'components/input';
import {Navigation} from 'components/navigation';
import React, {useEffect, useState} from 'react';
import {consts} from '../../../consts';
import {useActions} from '../../../hooks/use-actions';
import {ForumActions} from '../../../store/actions/forumActions';
import {useTypedSelector} from '../../../store/hooks/useTypedSelector';
import {TopicPreview} from '../Components/TopicPreview';

export default function Forum() {
    const forumActions = useActions(ForumActions);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const {theme = 'GREY'} = useTypedSelector((state) => state.user);
    const {topics} = useTypedSelector((state) => state.forum);

    const pageTitle = consts.forumPage.pageTitle;
    const buttonCreateTopic = consts.forumPage.buttonCreateTopic;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkProfile = consts.navigation.navLinkProfile;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;

    useEffect(() => {
        forumActions.getAllTopics();
    }, []);

    /**
     * Обработчик создания новой темы.
     */
    const handleTopicCreate = () => {
        forumActions.createNewTopic({text, title});
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
                    <div className={`forum-page__container container__theme-${theme}`}>
                        <div className="forum-page__topics-container">
                            <ul className="forum-page__topics">
                                {topics.map((topic) => (
                                    <li className="forum-page__topic" key={topic.id}>
                                        <TopicPreview topic={topic} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Input
                                nameField={consts.forumPage.title}
                                type="text"
                                name="title"
                                textError=""
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <Input
                                nameField={consts.forumPage.text}
                                type="text"
                                name="text"
                                textError=""
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                            />
                            <div className="forum-page__add-button">
                                <Button
                                    key={buttonCreateTopic}
                                    text={buttonCreateTopic}
                                    buttonColor={EButtonColor.PRIMARY}
                                    buttonType={EButtonType.FORUM_PAGE}
                                    onClick={handleTopicCreate}
                                    disabled={!title || !text}
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
