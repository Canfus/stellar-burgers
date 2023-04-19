import { FC } from 'react';

import { useAppSelector } from '../hooks/hooks';

import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactNode;
    anonymous?: boolean;
    background?: Location;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, anonymous = false, background }) => {
    const isLoggedIn = useAppSelector((store) => store.userSlice.isLoggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (background && !isLoggedIn) {
        return <h1>Loading...</h1>;
    }

    if (anonymous && isLoggedIn) {
        return <Navigate to={from} />
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return (
        <>
            {element}
        </>
    );
}