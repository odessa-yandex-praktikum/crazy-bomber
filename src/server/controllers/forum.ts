import {Request, Response} from 'express';
import Message from '../db/models/message';
import Topic from '../db/models/topic';
import {messageRepository} from '../db/repos/message';
import {topicRepository} from '../db/repos/topic';
import {userRepository} from '../db/repos/user';
import {ServerUser} from '../db/types';

const paramsErrorTitle = 'Requested parameters error';
const paramsErrorDesc = 'Requested parameters are not valid';
const postgreSQLError = 'PostgreSQL error';
const userError = 'Can not find or create user';

const topicRepo = topicRepository();
const messageRepo = messageRepository();
const userRepo = userRepository();

export type TTopic = Pick<
    Topic,
    'id' | 'author_id' | 'title' | 'text' | 'likes' | 'createdAt' | 'deletedAt' | 'updatedAt'
>;

export type TMessage = Pick<
    Message,
    'id' | 'author_id' | 'text' | 'createdAt' | 'deletedAt' | 'updatedAt'
>;

export type ReqCreateTopic = {
    title: string;
    text: string;
};

type TError = {error: any};

type Res<T> = T | TError;

export const forumController = () => {
    /**
     * Обработчик получения всех тем на форуме.
     */
    const getAllTopics = (_req: Request<void>, res: Response<Res<TTopic[]>>) => {
        topicRepo
            .getAll()
            .then((topics) => res.status(200).send(topics))
            .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
    };

    /**
     * Обработчик получения темы по идентификатору.
     */
    const getTopicById = (req: Request, res: Response<Res<TTopic | null>>) => {
        const {id} = req.params;

        if (!id || Number.isNaN(Number(id))) {
            res.status(400).json({
                error: {
                    type: paramsErrorTitle,
                    data: paramsErrorDesc,
                },
            });
        }

        topicRepo
            .get(Number(id))
            .then((topic) => res.status(200).send(topic))
            .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
    };

    /**
     * Обработчик добавления новой темы на форум.
     */
    const addTopic = (req: Request<any, any, ReqCreateTopic>, res: Response<Res<TTopic>>) => {
        const {title, text} = req.body;

        const isTopicValid = title.length > 2;
        const isMessageValid = text.length > 2;

        if (!isTopicValid || !isMessageValid) {
            res.status(400).json({
                error: {
                    type: paramsErrorTitle,
                    data: paramsErrorDesc,
                },
            });
        }

        userRepo.findOrCreateAndGet(req.app.locals.userInfo as ServerUser).then((user) => {
            if (!user) {
                throw new Error(userError);
            }
            return topicRepo
                .addTopic(user.toJSON() as ServerUser, title, text)
                .then((topic) => res.status(200).send(topic))
                .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
        });
    };

    /**
     * Обработчик проставления лайка.
     */
    const addTopicLike = (req: Request, res: Response<Res<TTopic>>) => {
        const {id} = req.params;

        if (!id || Number.isNaN(Number(id))) {
            res.status(400).json({
                error: {
                    type: paramsErrorTitle,
                    data: paramsErrorDesc,
                },
            });
        }

        return topicRepo
            .addLike(Number(id))
            .then((topic) => res.status(200).send(topic))
            .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
    };

    /**
     * Обработчик ответа в теме.
     */
    const replyToTopic = (req: Request<any, any, {text: string}>, res: Response<Res<TMessage>>) => {
        const {id} = req.params;
        const {text} = req.body;

        if (!id || Number.isNaN(Number(id)) || !text || text.length < 3) {
            res.status(400).json({
                error: {
                    type: paramsErrorTitle,
                    data: paramsErrorDesc,
                },
            });
        }

        userRepo.findOrCreateAndGet(req.app.locals.userInfo as ServerUser).then((user) => {
            if (!user) {
                throw new Error(userError);
            }

            return messageRepo
                .addMessage(user.toJSON() as ServerUser, Number(id), text)
                .then((message) => res.status(200).send(message))
                .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
        });
    };

    /**
     * Обработчик получения всех сообщений темы форума.
     */
    const getAllMessagesForTopic = (req: Request, res: Response) => {
        const {id} = req.params;

        if (!id || Number.isNaN(Number(id))) {
            res.status(400).json({
                error: {
                    type: paramsErrorTitle,
                    data: paramsErrorDesc,
                },
            });
        }

        return messageRepo
            .getAllForTopic(Number(id))
            .then((messages) => res.status(200).send(messages))
            .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
    };

    return {
        getAllTopics,
        getTopicById,
        addTopic,
        addTopicLike,
        replyToTopic,
        getAllMessagesForTopic,
    };
};
