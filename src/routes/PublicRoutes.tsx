import MainLayout from "~/layouts/MainLayout/MainLayout";
import { Suspense } from "./LazyRoutes";
import Homepage from "~/pages/client/HomePage";


 const PublicRoutes = [
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path: '',
                element: (
                    <Suspense>
                        <Homepage />
                    </Suspense>
                ),
            },
        ]
    }
];

export default PublicRoutes;