import {ThunkDispatch} from 'redux-thunk';
import {ReqCreateTopic, TMessage, TTopic} from '../../server/controllers/forum';
import {ForumAPI} from '../../services/api/forum-api';
import {IAppState} from '../index';
import {actionCreator} from '../types/forum';

export class ForumActions {
    private forumApi = new ForumAPI();
    constructor(private dispatch: ThunkDispatch<IAppState, void, any>) {}

    getAllTopics = (): void => {
        this.dispatch(actionCreator.forum.loading());
        this.forumApi.getAllTopics().then((topics) => {
            this.dispatch(actionCreator.forum.success(topics));
        });
    };

    createNewTopic = ({title, text}: ReqCreateTopic): void => {
        this.forumApi.createNewTopic({title, text}).then(this.getAllTopics);
    };

    getTopicById = (id: number): Promise<TTopic> => {
        this.dispatch(actionCreator.topic.loading());
        return this.forumApi.getTopicById(id).then((topic) => {
            this.dispatch(actionCreator.topic.success(topic));
            return topic;
        });
    };

    getAllTopicMessagesById = (id: number): void => {
        this.dispatch(actionCreator.messages.loading());
        this.forumApi.getAllTopicMessagesById(id).then((messages: TMessage[]) => {
            this.dispatch(actionCreator.messages.success(messages));
        });
    };

    likeTopicById = (id: number): void => {
        this.forumApi.likeTopicById(id).then((topic) => {
            this.dispatch(actionCreator.topic.success(topic));
        });
    };

    replyToTopicById = ({id, text}) => {
        this.dispatch(actionCreator.topic.loading());
        this.forumApi.replyToTopicById({id, text}).then((_message) => {
            this.getAllTopicMessagesById(id);
        });
    };
}
