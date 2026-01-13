import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const userRole = user.publicMetadata?.role || 'customer';

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Role mismatch - redirect to their specific dashboard
        const roleRoutes = {
            admin: '/admin-dashboard',
            manager: '/manager-dashboard',
            employee: '/employee-dashboard',
            customer: '/dashboard'
        };
        return <Navigate to={roleRoutes[userRole] || '/'} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
