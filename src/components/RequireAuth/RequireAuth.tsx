import { Navigate, Outlet, useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/UserStore';

const RequireAuth = observer(() => {
    const location = useLocation()
    if (!userStore.isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />;
})

export default RequireAuth;