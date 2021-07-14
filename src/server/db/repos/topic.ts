import Topic from '../models/topic';
import {ServerUser} from '../types';

export const topicRepository = () => {
    const addTopic = (user: ServerUser, title: string, text: string) => {
        return Topic.create({author_id: user.user_id, title: title, text: text});
    };

    const addLike = (id: number) => {
        return Topic.findByPk(id).then((topic) => {
            return topic?.increment('likes');
        });
    };

    const getAll = () => {
        return Topic.findAll();
    };

    const get = (id: number) => {
        return Topic.findByPk(id);
    };

    return {
        addTopic,
        addLike,
        get,
        getAll,
    };
};
