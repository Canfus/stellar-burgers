import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../services/slices/UserSlice';
import { getUserRequest, requestWithToken } from './burger-api';

const AuthContext = createContext(undefined);

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

const useProvideAuth = () => {
    const user = useSelector((store) => store.userSlice.user);

    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            return await requestWithToken(getUserRequest())
                .then(data => {
                    if (data.success) {
                        dispatch(getUserData());
                    }
                    return data.success;
                });
        } catch {
            return null;
        }
    };

    return {
        user,
        getUser
    };
}