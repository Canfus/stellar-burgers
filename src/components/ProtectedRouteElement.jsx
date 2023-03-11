import { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../utils/auth';

export const ProtectedRouteElement = ({ element }) => {
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    }

    useEffect(() => {
        init();
    //eslint-disable-next-line
    }, []);

    if (!isUserLoaded) {
        return null;
    }
    
    return auth.user.email ? element : <Navigate to='/login' replace={true} />;
}