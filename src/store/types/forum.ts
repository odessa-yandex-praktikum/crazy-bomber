import {TMessage, TTopic} from '../../server/controllers/forum';

export enum ForumActionTypes {
    LOADING = 'FORUM_LOADING',
    SUCCESS = 'FORUM_SUCCESS',
    FAILURE = 'FORUM_FAILURE',
}

export enum TopicActionTypes {
    LOADING = 'TOPIC_LOADING',
    SUCCESS = 'TOPIC_SUCCESS',
    FAILURE = 'TOPIC_FAILURE',
}

export enum MessagesActionTypes {
    LOADING = 'MESSAGES_LOADING',
    SUCCESS = 'MESSAGES_SUCCESS',
    FAILURE = 'MESSAGES_FAILURE',
}

type ForumLoading = {
    type: typeof ForumActionTypes.LOADING;
};

type ForumSuccess = {
    type: typeof ForumActionTypes.SUCCESS;
    payload: {topics: TTopic[]};
};

type ForumFailure = {
    type: typeof ForumActionTypes.FAILURE;
    payload: {error: string};
};

type TopicLoading = {
    type: typeof TopicActionTypes.LOADING;
};

type TopicSuccess = {
    type: typeof TopicActionTypes.SUCCESS;
    payload: {topic: TTopic};
};

type TopicFailure = {
    type: typeof TopicActionTypes.FAILURE;
    payload: {error: string};
};

type MessagesLoading = {
    type: typeof MessagesActionTypes.LOADING;
};

type MessagesSuccess = {
    type: typeof MessagesActionTypes.SUCCESS;
    payload: {messages: TMessage[]};
};

type MessagesFailure = {
    type: typeof MessagesActionTypes.FAILURE;
    payload: {error: string};
};

export type ForumAction =
    | ForumLoading
    | ForumSuccess
    | ForumFailure
    | TopicLoading
    | TopicSuccess
    | TopicFailure
    | MessagesLoading
    | MessagesSuccess
    | MessagesFailure;

export const actionCreator = {
    forum: {
        loading: (): ForumLoading => {
            return {
                type: ForumActionTypes.LOADING,
            };
        },
        success: (topics: TTopic[]): ForumSuccess => {
            return {
                type: ForumActionTypes.SUCCESS,
                payload: {topics},
            };
        },
        failure: (error: string): ForumFailure => {
            return {
                type: ForumActionTypes.FAILURE,
                payload: {error},
            };
        },
    },
    topic: {
        loading: (): TopicLoading => {
            return {
                type: TopicActionTypes.LOADING,
            };
        },
        success: (topic: TTopic): TopicSuccess => {
            return {
                type: TopicActionTypes.SUCCESS,
                payload: {topic},
            };
        },
        failure: (error: string): TopicFailure => {
            return {
                type: TopicActionTypes.FAILURE,
                payload: {error},
            };
        },
    },
    messages: {
        loading: (): MessagesLoading => {
            return {
                type: MessagesActionTypes.LOADING,
            };
        },
        success: (messages: TMessage[]): MessagesSuccess => {
            return {
                type: MessagesActionTypes.SUCCESS,
                payload: {messages},
            };
        },
        failure: (error: string): MessagesFailure => {
            return {
                type: MessagesActionTypes.FAILURE,
                payload: {error},
            };
        },
    },
};
