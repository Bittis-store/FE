import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';

const SliderControls = ({
    handleNext,
    handlePrev,
    isButtonHandle,
}: {
    handleNext: () => void;
    handlePrev: () => void;
    isButtonHandle?: boolean;
}) => {
    return (
        <div
            className={clsx({
                ['hidden']: isButtonHandle,
            })}
        >
            <LeftOutlined
                onClick={handlePrev}
                className='text-global hover:bg-hover absolute top-[50%] left-3 z-50 block translate-y-[-50%] rounded-full border-transparent bg-white p-3 text-[10px] font-extrabold opacity-100 transition-all duration-700 ease-in-out hover:!text-[#fff]'
            />
            <RightOutlined
                onClick={handleNext}
                className='text-global hover:bg-hover absolute top-[50%] right-3 z-[50] block translate-y-[-50%] rounded-full border-transparent bg-white p-3 text-[10px] font-extrabold opacity-100 transition-all duration-700 ease-in-out hover:!text-[#fff]'
            />
        </div>
    );
};

export default SliderControls;
