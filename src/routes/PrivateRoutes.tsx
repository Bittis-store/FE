import { ADMIN_ROUTES } from '~/constants/router';
import AdminLayout from '~/layouts/AdminLayout';
import {
    CategoryList,
    CreateCategory,
    CreateProduct,
    DashboardPage,
    ProductList,
    Suspense,
    UpdateCategory,
    UpdateProduct,
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
            // @Category
            {
                path: ADMIN_ROUTES.CATEGORIES,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <CategoryList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_CREATE,
                        element: (
                            <Suspense>
                                <CreateCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.CATEGORIES_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateCategory />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Product
            {
                path: ADMIN_ROUTES.PRODUCTS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.PRODUCTS_CREATE,
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.PRODUCTS_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];
