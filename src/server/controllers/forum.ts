import {Request, Response} from 'express';
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

export const forumController = () => {
    const getAllTopics = (_req: Request, res: Response) => {
        topicRepo
            .getAll()
            .then((topics) => res.status(200).send(topics))
            .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
    };

    const getTopic = (req: Request, res: Response) => {
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
            .then((topics) => res.status(200).send(topics))
            .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
    };

    const addTopic = (req: Request, res: Response) => {
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

        userRepo.findOrCreateAndGet(res.locals.userInfo as ServerUser).then((user) => {
            if (!user) {
                throw new Error(userError);
            }
            return topicRepo
                .addTopic(user.toJSON() as ServerUser, title, text)
                .then((topic) => res.status(200).send(topic))
                .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
        });
    };

    const addTopicLike = (req: Request, res: Response) => {
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

    const replyToTopic = (req: Request, res: Response) => {
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

        userRepo.findOrCreateAndGet(res.locals.userInfo as ServerUser).then((user) => {
            if (!user) {
                throw new Error(userError);
            }

            return messageRepo
                .addMessage(user.toJSON() as ServerUser, Number(id), text)
                .then((message) => res.status(200).send(message))
                .catch((err) => res.status(500).json({error: [postgreSQLError, err]}));
        });
    };

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

    return {getAllTopics, getTopic, addTopic, addTopicLike, replyToTopic, getAllMessagesForTopic};
};
