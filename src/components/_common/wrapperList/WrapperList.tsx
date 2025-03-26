import { ReactNode } from 'react';
import { cn } from '~/utils/TailwindMerge';
import TitleDisplay from '../TitleDisplay';

interface IWrapperListProps {
    children: ReactNode;
    hasData?: boolean;
    title: string;
    option?: ReactNode;
    className?: string;
    outline?: boolean;
    classic?: boolean;
    box?: boolean;
    lineButtonBox?: boolean;
    handleClick?: () => void;
}

const WrapperList: React.FC<IWrapperListProps> = ({
    children,
    hasData = true,
    title,
    className,
    handleClick,
    outline,
    lineButtonBox,
    classic,
    box,
    option,
}) => {
    return (
        <div
            className={cn(
                'rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out',
                {
                    'border border-gray-200 hover:shadow-xl': outline,
                    'my-10': classic,
                    'border-b-2 border-gray-200 pb-4': lineButtonBox,
                    'p-6': box,
                },
                className
            )}
        >
            <div
                className={cn('flex items-center justify-between px-6 py-4', {
                    'border-b border-gray-200': !lineButtonBox,
                })}
            >
                <TitleDisplay
                    onClick={handleClick}
                    title={title}
                    className='text-xl font-semibold tracking-tight text-gray-800 transition-colors duration-200 hover:text-teal-600'
                />
                <div className='flex items-center gap-3'>
                    {option && (
                        <div className='transform transition-transform duration-200 hover:scale-105'>{option}</div>
                    )}
                </div>
            </div>

            <div className={cn('p-6', { 'opacity-50': !hasData })}>{children}</div>
        </div>
    );
};

export default WrapperList;
