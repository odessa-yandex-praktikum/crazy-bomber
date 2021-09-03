import {TMessage, TTopic} from '../../server/controllers/forum';
import {ForumAction, ForumActionTypes, MessagesActionTypes, TopicActionTypes} from '../types/forum';

export type ForumState = {
    topics: TTopic[];
    messages?: TMessage[];
    topic?: TTopic;
    error?: string;
};

export const initialState = {
    topics: [],
};

export const forumReducer = (state: ForumState = initialState, action: ForumAction): ForumState => {
    switch (action.type) {
        case ForumActionTypes.LOADING:
            return state;

        case ForumActionTypes.SUCCESS:
            return {
                ...state,
                topics: action.payload.topics.sort((topicA, topicB) => topicA.likes - topicB.likes),
            };

        case ForumActionTypes.FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };

        case TopicActionTypes.LOADING:
            return state;

        case TopicActionTypes.SUCCESS:
            return {
                ...state,
                topic: action.payload.topic,
            };

        case TopicActionTypes.FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };

        case MessagesActionTypes.LOADING:
            return state;

        case MessagesActionTypes.SUCCESS:
            return {
                ...state,
                messages: action.payload.messages,
            };

        case MessagesActionTypes.FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };

        default:
            return state;
    }
};
