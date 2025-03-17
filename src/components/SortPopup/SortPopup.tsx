import { Radio, RadioChangeEvent, Space } from 'antd';

type SortPopup = {
    value?: string;
    onChange: (e: RadioChangeEvent) => void;
};

const SortPopupComponent = ({ value, onChange }: SortPopup) => {
    return (
        <Radio.Group onChange={onChange} value={value} size='large' className='rounded bg-white shadow'>
            <Space direction='vertical' className='px-4 py-3'>
                <Radio value={'-createdAt'} className='w-full py-1 font-normal select-none'>
                    Mới nhất
                </Radio>
                <Radio value={'-price'} className='w-full py-1 font-normal select-none'>
                    Giá: từ cao đến thấp
                </Radio>
                <Radio value={'price'} className='w-full py-1 font-normal select-none'>
                    Giá: từ thấp đến cao
                </Radio>
            </Space>
        </Radio.Group>
    );
};

export default SortPopupComponent;
