import {ReqCreateTopic, TMessage, TTopic} from '../../server/controllers/forum';
import {getFetchToJson} from './common';

/**
 * Класс для работы с АПИ форума.
 */
export class ForumAPI {
    private baseURL =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000'
            : 'https://odessa-crazyboomber-5.ya-praktikum.tech';

    private endpoints = {
        getAllTopics: '/forum',
        getTopicById: '/forum/topic',
        getAllTopicMessagesById: {
            prefix: '/forum/topic',
            postfix: '/messages',
        },
        replyToTopicById: {
            prefix: '/forum/topic',
            postfix: '/reply',
        },
        likeTopicById: {
            prefix: '/forum/topic',
            postfix: '/like',
        },
    };

    /**
     * Получение всех тем на форуме.
     */
    getAllTopics = (): Promise<TTopic[]> => {
        return getFetchToJson<TTopic[]>(`${this.baseURL}${this.endpoints.getAllTopics}`);
    };

    /**
     * Получение темы на форуме по идентификатору.
     */
    getTopicById = (id: number): Promise<TTopic> => {
        return getFetchToJson<TTopic>(`${this.baseURL}${this.endpoints.getTopicById}/${id}`);
    };

    /**
     * Получение всех сообщений темы по идентификатору.
     */
    getAllTopicMessagesById = (id: number): Promise<TMessage[]> => {
        return getFetchToJson<TMessage[]>(
            `${this.baseURL}${this.endpoints.getAllTopicMessagesById.prefix}/${id}${this.endpoints.getAllTopicMessagesById.postfix}`
        );
    };

    /**
     * Отправить сообщение в тему по идентификатору.
     */
    replyToTopicById = ({id, text}): Promise<TMessage> => {
        return getFetchToJson<TMessage>(
            `${this.baseURL}${this.endpoints.replyToTopicById.prefix}/${id}${this.endpoints.replyToTopicById.postfix}`,
            'POST',
            {text}
        );
    };

    /**
     * Отправить сообщение в тему по идентификатору.
     */
    likeTopicById = (id: number): Promise<TTopic> => {
        return getFetchToJson<TTopic>(
            `${this.baseURL}${this.endpoints.likeTopicById.prefix}/${id}${this.endpoints.likeTopicById.postfix}`,
            'POST'
        );
    };

    /**
     * Создание темы.
     */
    createNewTopic = (body: ReqCreateTopic): Promise<TTopic> => {
        return getFetchToJson(`${this.baseURL}${this.endpoints.getAllTopics}`, 'POST', body);
    };
}
