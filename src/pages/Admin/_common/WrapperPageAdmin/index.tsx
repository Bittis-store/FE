import { ReactNode } from 'react';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import { Button } from 'antd';
import useTable from '~/hooks/_common/useTable';

const WrapperPageAdmin = ({ title, option, children }: { title: string; option?: ReactNode; children: ReactNode }) => {
    const { resetFilter } = useTable();
    const handleResetAll = () => resetFilter();

    return (
        <WrapperList
            title={title}
            lineButtonBox
            className='mt-8'
            option={
                !option ? (
                    <Button
                        onClick={handleResetAll}
                        className='rounded-full bg-teal-500 px-5 font-medium text-white shadow-md transition-all duration-300 hover:bg-teal-600 hover:shadow-lg'
                    >
                        Đặt lại bộ lọc
                    </Button>
                ) : (
                    option
                )
            }
        >
            <div className='rounded-xl bg-gray-50 p-5 shadow-inner'>{children}</div>
        </WrapperList>
    );
};

export default WrapperPageAdmin;
