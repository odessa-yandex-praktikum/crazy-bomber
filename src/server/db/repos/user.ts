import User from '../models/user';
import {ServerUser} from '../types';

export const userRepository = () => {
    const findOrCreateAndGet = ({user_id, login, avatar}: ServerUser) => {
        const where = {user_id};

        const userToUpdate = {
            user_id,
            login,
            avatar,
        };

        return User.findOne({where}).then((foundedUser) => {
            if (!foundedUser) {
                return User.create(userToUpdate).then((item) => item);
            }

            return foundedUser.update(userToUpdate);
        });
    };

    return {
        findOrCreateAndGet,
    };
};
