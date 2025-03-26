import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { cn } from '~/utils/TailwindMerge';

interface TitleDisplayProps {
    title: string;
    onClick?: () => void;
    border?: boolean;
    option?: ReactNode;
    className?: string;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ option, title, border, onClick, className }) => {
    const [status, setStatus] = useState<boolean>(false);

    const handleClick = () => {
        if (onClick) {
            onClick();
            setStatus(!status);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={cn(
                'flex items-center justify-between py-3 transition-all duration-300 ease-in-out',
                {
                    'border-b-2 border-teal-500': border, // Thay màu đỏ #da291c bằng teal-500 cho hiện đại
                    'cursor-pointer rounded-lg px-2 hover:bg-gray-50': onClick, // Hiệu ứng hover khi có onClick
                },
                className
            )}
        >
            <div className='flex items-center gap-3'>
                {onClick && (
                    <span className='text-teal-600 transition-transform duration-200'>
                        {status ? <PlusOutlined className='text-lg' /> : <MinusOutlined className='text-lg' />}
                    </span>
                )}
                <h1
                    className={cn(
                        'text-lg font-semibold tracking-tight text-gray-800 capitalize md:text-xl',
                        'transition-colors duration-200 hover:text-teal-600'
                    )}
                >
                    {title}
                </h1>
            </div>

            {option && (
                <div className='flex transform items-center transition-transform duration-200 hover:scale-105'>
                    {option}
                </div>
            )}
        </div>
    );
};

export default TitleDisplay;
