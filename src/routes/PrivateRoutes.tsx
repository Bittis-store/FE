import { ADMIN_ROUTES } from '~/constants/router';
import AdminLayout from '~/layouts/AdminLayout';
import {
    DashboardPage,
    Suspense,
} from './LazyRoutes';

export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            // <ProtectedRoute>
            <AdminLayout />
            // </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
        ],
    },
];
