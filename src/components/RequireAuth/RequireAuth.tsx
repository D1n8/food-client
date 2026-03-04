import { Navigate, Outlet, useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/UserStore';
import { routes } from 'config/routes';

const RequireAuth = observer(() => {
    const location = useLocation()
    if (!userStore.isAuth) {
        return <Navigate to={routes.login.mask} state={{ from: location }} replace />
    }

    return <Outlet />;
})

export default RequireAuth;