import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = (props: { sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void }) => {
    return (
        <header className='sticky top-0 z-50 flex w-full bg-white shadow-sm dark:bg-gray-800 dark:shadow-none'>
            <div className='flex flex-grow items-center justify-between px-4 py-3 md:px-6 2xl:px-8'>
                {/* Hamburger Menu */}
                <div className='flex items-center gap-3 lg:hidden'>
                    <button
                        aria-controls='sidebar'
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className='rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    >
                        <MenuOutlined className='text-lg' />
                    </button>
                </div>

                {/* Logo */}
                <Link to='/' className='flex flex-shrink-0 items-center'>
                    <span className='text-2xl font-bold tracking-tight text-[#da291c] uppercase'>Bittis-Store</span>
                    <span className='ml-2 hidden text-lg font-medium text-gray-700 md:inline dark:text-gray-200'>
                        Quản trị Admin
                    </span>
                </Link>

                {/* Right Section */}
                <div className='2xsm:gap-6 flex items-center gap-4'>
                    <ul className='2xsm:gap-5 flex items-center gap-3'>
                        {/* Dark Mode Toggler */}
                        {/* <DarkModeSwitcher /> */}

                        {/* Notification Menu */}
                        {/* <DropdownNotification /> */}

                        {/* Chat Notification */}
                        {/* <DropdownMessage /> */}
                    </ul>

                    {/* User Area */}
                    {/* <DropdownUser /> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
