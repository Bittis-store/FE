import { Outlet } from 'react-router-dom';
import Header from '../_components/Main/Header/Header';
import Footer from '../_components/Main/Footer/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className='min-h-[50vh]'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
