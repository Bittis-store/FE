import { Outlet } from 'react-router-dom';
import Header from '../_components/Main/Header/Header';
import Footer from '../_components/Main/Footer/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className='mx-auto min-h-[50vh] w-[80vw]'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
