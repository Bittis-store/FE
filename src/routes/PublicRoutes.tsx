import MainLayout from "~/layouts/MainLayout/MainLayout";
import { ForgotPasswordPage, HomaPage, LoginPage, ProductsPage, RegisterPage, Suspense, VerifyAccountPage } from "./LazyRoutes";
import { MAIN_ROUTES } from "~/constants/router";
import AuthProtected from "~/layouts/Protected/AuthProtected";
import { Navigate } from "react-router-dom";
import NotFound from "~/pages/NotFound";
import ProductDetailsPage from "~/pages/client/ProductDetailsPage/Productdetails";


 const PublicRoutes = [
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path: '',
                element: (
                    <Suspense>
                        <HomaPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.VERIFY,
                element: (
                    <Suspense>
                        <VerifyAccountPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.FORGOT_PASSWORD,
                element: (
                    <Suspense>
                        <ForgotPasswordPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.REGISTER,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <RegisterPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path:  MAIN_ROUTES.LOGIN,
                element: (
                    <Suspense>
                          <AuthProtected>
                                <LoginPage />
                          </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path:  MAIN_ROUTES.PRODUCTS,
                element: (
                    <Suspense>
                            <ProductsPage />
                    </Suspense>
                ),
            },
            {
                path:  `${MAIN_ROUTES.PRODUCTS}/:id`,
                element: (
                    <Suspense>
                            <ProductDetailsPage />
                    </Suspense>
                ),
            },
        ],
       
    },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to={'/404'} /> },
    
];

export default PublicRoutes;