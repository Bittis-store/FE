import MainLayout from "~/layouts/MainLayout/MainLayout";
import { HomaPage, LoginPage, RegisterPage, Suspense } from "./LazyRoutes";
import { MAIN_ROUTES } from "~/constants/router";
import AuthProtected from "~/layouts/Protected/AuthProtected";
import { Navigate } from "react-router-dom";
import NotFound from "~/pages/NotFound";


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
        ],
       
    },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to={'/404'} /> },
    
];

export default PublicRoutes;