import { FC, ReactNode, useState } from 'react';
import ClickOutside from '~/components/_common/ClickOutside';
import { cn } from '~/utils';

type IDropdown = {
    title: string;
    icon: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
};

const Dropdown: FC<IDropdown> = ({ icon, title, footer, children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
            <li className='relative list-none'>
                <span
                    onClick={() => {
                        setNotifying(false);
                        setDropdownOpen(!dropdownOpen);
                    }}
                    className={cn(
                        'relative flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-200',
                        'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                        'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    )}
                >
                    <span
                        className={cn(
                            'absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500',
                            notifying ? 'inline-flex' : 'hidden'
                        )}
                    >
                        <span className='absolute inset-0 h-full w-full animate-ping rounded-full bg-red-500 opacity-50' />
                    </span>
                    {icon}
                </span>

                {/* Dropdown Content */}
                {dropdownOpen && (
                    <div
                        className={cn(
                            'absolute right-0 mt-2 w-72 rounded-md bg-white shadow-lg',
                            'border border-gray-200 dark:border-gray-700 dark:bg-gray-800',
                            'transition-all duration-200 ease-in-out'
                        )}
                    >
                        <div className='border-b border-gray-200 px-4 py-2.5 dark:border-gray-700'>
                            <h5 className='text-sm font-medium text-gray-700 dark:text-gray-200'>{title}</h5>
                        </div>

                        <ul className='flex max-h-80 flex-col overflow-y-auto p-1.5'>{children}</ul>

                        {footer && (
                            <div className='border-t border-gray-200 px-4 py-2 dark:border-gray-700'>{footer}</div>
                        )}
                    </div>
                )}
            </li>
        </ClickOutside>
    );
};

export default Dropdown;
