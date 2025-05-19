import { Modal, Table } from 'antd';
import { useState } from 'react';

const SizeGuideModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns: any = [
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            align: 'center',
            className: 'font-semibold',
        },
        {
            title: 'Ngực (cm)',
            dataIndex: 'chest',
            key: 'chest',
            align: 'center',
        },
        {
            title: 'Eo (cm)',
            dataIndex: 'waist',
            key: 'waist',
            align: 'center',
        },
        {
            title: 'Hông (cm)',
            dataIndex: 'hip',
            key: 'hip',
            align: 'center',
        },
        {
            title: 'Chiều cao (cm)',
            dataIndex: 'height',
            key: 'height',
            align: 'center',
        },
    ];

    const sizeChartData = [
        {
            key: '1',
            size: 'S',
            chest: '88-92',
            waist: '73-77',
            hip: '88-92',
            height: '155-160',
        },
        {
            key: '2',
            size: 'M',
            chest: '92-96',
            waist: '77-81',
            hip: '92-96',
            height: '160-165',
        },
        {
            key: '3',
            size: 'L',
            chest: '96-100',
            waist: '81-85',
            hip: '96-100',
            height: '165-170',
        },
        {
            key: '4',
            size: 'XL',
            chest: '100-104',
            waist: '85-89',
            hip: '100-104',
            height: '170-175',
        },
    ];

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className='flex cursor-pointer items-center py-4 text-base font-medium'
            >
                <span className='underline uppercase'>Hướng dẫn chọn size</span>
            </div>

            <Modal
                title={<div className='text-lg font-bold'>Bảng hướng dẫn chọn size</div>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
            >
                <div className='mt-4'>
                    <Table dataSource={sizeChartData} columns={columns} pagination={false} bordered />
                    <div className='mt-4 space-y-2 text-sm text-gray-600'>
                        <p>* Bảng size trên là bảng size tham khảo, có thể có sai số 1-2cm do cách đo</p>
                        <p>* Nếu bạn đang phân vân giữa 2 size, hãy chọn size lớn hơn để thoải mái hơn</p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SizeGuideModal;
