import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../../firebase/context';
import FullPageLoader from './full-page-loader';

type PrivateRouteProps = {
    protectedRoutes: Array<string>,
    children: JSX.Element | JSX.Element[]
}

const PrivateRoute = ({ protectedRoutes, children }: PrivateRouteProps) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathIsProtected) {
            // Redirect route, you can point this to /login
            router.push('/login');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isAuthenticated, pathIsProtected]);

    if (((isLoading || !isAuthenticated) && pathIsProtected)) {
        return <FullPageLoader />;
    }

    return children;
}

export default PrivateRoute;