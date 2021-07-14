import Message from '../models/message';
import {ServerUser} from '../types';

export const messageRepository = () => {
    const addMessage = (user: ServerUser, topicId: number, text: string) => {
        return Message.create({topic_id: topicId, author_id: user.user_id, text: text});
    };

    const getAllForTopic = (topicId: number) => {
        return Message.findAll({
            where: {topic_id: topicId},
        });
    };

    return {
        addMessage,
        getAllForTopic,
    };
};
