import { FC } from 'react';

import { useAppSelector } from '../hooks/hooks';

import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactNode;
    anonymous?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, anonymous = false }) => {
    const isLoggedIn = useAppSelector((store) => store.userSlice.isLoggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return <>{element}</>;
}