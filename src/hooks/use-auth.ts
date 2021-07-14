import {useTypedSelector} from '../store/hooks/useTypedSelector';

const useAuth = () => {
    const isAuthorized = useTypedSelector((state) => state.user.loggedIn);

    return {
        isAuthorized,
    };
};

export {useAuth};
