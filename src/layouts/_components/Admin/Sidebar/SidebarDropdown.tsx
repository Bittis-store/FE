import { NavLink } from 'react-router-dom';
import { IChildrenItem } from './_options';

const SidebarDropdown = ({ item }: { item: IChildrenItem[] }) => {
    return (
        <ul className='mt-3 flex flex-col gap-1.5 pl-6'>
            {item.map((menuItem, index) => (
                <li key={index}>
                    <NavLink
                        end
                        to={menuItem.route}
                        className={({ isActive }) =>
                            `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 ease-in-out hover:bg-gray-800 hover:text-white ${
                                isActive ? 'bg-gray-800 text-white' : ''
                            }`
                        }
                    >
                        <span className='h-1.5 w-1.5 rounded-full bg-gray-500 group-hover:bg-white' />
                        {menuItem.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default SidebarDropdown;
