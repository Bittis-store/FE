import { ADMIN_ROUTES } from '~/constants/router';
import AdminLayout from '~/layouts/AdminLayout';
import {
    CategoryList,
    ColorList,
    CreateCategory,
    CreateColor,
    CreateProduct,
    CreateSize,
    DashboardPage,
    ManageOrders,
    OrdersDetails,
    ProductList,
    SizeList,
    Suspense,
    UpdateCategory,
    UpdateColor,
    UpdateProduct,
    UpdateSize,
} from './LazyRoutes';
import { Outlet } from 'react-router-dom';

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
            // @Size
            {
                path: ADMIN_ROUTES.SIZES,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <SizeList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <SizeList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateSize />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateSize />
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
                        path: `${ADMIN_ROUTES.PRODUCTS_EDIT}/:id/edit`,
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                ],
            },
             // @Color
             {
                path: ADMIN_ROUTES.COLORS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ColorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ColorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateColor />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateColor />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @order
            {
                path: ADMIN_ROUTES.ORDERS,
                element: (
                    <Suspense>
                        <ManageOrders />
                    </Suspense>
                ),
            },
            // @Order-detail
            {
                path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                element: (
                    <Suspense>
                        <OrdersDetails />
                    </Suspense>
                ),
            },
        ],
    },
];
