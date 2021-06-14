import {useTypedSelector} from '../store/hooks/useTypedSelector';

const useAuth = () => {
    const isAuthorized = useTypedSelector((state) => state.user.currentUser);

    return {
        isAuthorized,
    };
};

export {useAuth};
