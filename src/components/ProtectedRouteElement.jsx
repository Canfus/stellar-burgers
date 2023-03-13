import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ element, anonymous = false }) => {
    const isLoggedIn = useSelector((store) => store.userSlice.isLoggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return element;
}