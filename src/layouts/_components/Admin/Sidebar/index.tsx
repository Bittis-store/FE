import { CloseOutlined } from '@ant-design/icons';
import ClickOutside from '~/components/_common/ClickOutside';
import { menuGroups } from './_options';
import SidebarItem from './SidebarItem';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>
            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-hidden bg-gray-900 text-white shadow-lg duration-300 ease-in-out lg:static lg:translate-x-0 dark:bg-gray-950 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Sidebar Header */}
                <div className='flex items-center justify-between border-b border-gray-800 px-6 py-4'>
                    <div className='flex items-center gap-3'>
                        {/* Logo Placeholder - Uncomment and adjust as needed */}
                        {/* <Link to="/">
                            <img
                                className="h-8 w-auto rounded-md"
                                src={StaticImages.logo}
                                alt="Logo"
                            />
                        </Link> */}
                        <span className='text-lg font-semibold tracking-tight'>Bittis-Store</span>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        aria-controls='sidebar'
                        className='rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden'
                    >
                        <CloseOutlined className='text-base' />
                    </button>
                </div>

                {/* Sidebar Menu */}
                <div className='flex flex-1 flex-col overflow-y-auto'>
                    <nav className='mt-4 px-3 py-2'>
                        <ul className='flex flex-col gap-2'>
                            {menuGroups.map((menuItem, menuIndex) => (
                                <SidebarItem key={menuIndex} item={menuItem} />
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </ClickOutside>
    );
};

export default Sidebar;
