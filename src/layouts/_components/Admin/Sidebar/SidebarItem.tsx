import { NavLink, useLocation } from 'react-router-dom';
import SidebarDropdown from './SidebarDropdown';
import { IMenuItem } from './_options';
import { FC, useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { cn } from '~/utils';

export type ISidebarItem = {
    item: IMenuItem;
};

const SidebarItem: FC<ISidebarItem> = ({ item }) => {
    const [isMenuActive, setIsMenuActive] = useState(false); // Mặc định đóng dropdown
    const location = useLocation();

    const handleClick = () => {
        setIsMenuActive(!isMenuActive);
    };

    const isActive = (path: IMenuItem) => {
        if (path.route === location.pathname) return true;
        if (path.children) {
            return path.children.some((child) => child.route === location.pathname);
        }
        return false;
    };

    const isItemActive = isActive(item);

    return (
        <li>
            <span
                onClick={item.children ? handleClick : undefined}
                className={cn(
                    'group flex items-center justify-between gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-gray-200 transition-colors duration-200 ease-in-out',
                    'hover:bg-gray-800 hover:text-white',
                    isItemActive ? 'bg-gray-800 text-white' : ''
                )}
            >
                <div className='flex items-center gap-2.5'>
                    {item.icon}
                    {item.children || !item.route ? (
                        <span>{item.label}</span>
                    ) : (
                        <NavLink to={item.route} className='w-full'>
                            {item.label}
                        </NavLink>
                    )}
                </div>
                {item.children && (
                    <CaretDownOutlined
                        className={cn('text-gray-400 transition-transform duration-200', isMenuActive && 'rotate-180')}
                    />
                )}
            </span>

            {item.children && (
                <div className={cn('transition-all duration-200 ease-in-out', { hidden: !isMenuActive })}>
                    <SidebarDropdown item={item.children} />
                </div>
            )}
        </li>
    );
};

export default SidebarItem;
