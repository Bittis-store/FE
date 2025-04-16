import { Avatar, Rate } from 'antd';
import { memo } from 'react';
import { IReviewItem } from '~/types/review';
import dayjs from 'dayjs';

type Props = {
    item: IReviewItem;
};

const ReviewItem = ({ item }: Props) => {
    return (
        <div className='mt-4 border-b border-gray-200 pb-4'>
            <div className='flex gap-3'>
                <Avatar icon={<img src={item?.userId?.avatar} alt='ảnh đại diện' />} />
                <div>
                    <span className='text-sm'>{item?.userId?.name || 'Người dùng'}</span>
                    <div>
                        <Rate defaultValue={item.rating} disabled style={{ fontSize: 14 }} />
                    </div>
                    <div className='mt-1 flex flex-wrap items-baseline bg-white'>
                        <div className='text-secondary text-sm'>
                            {dayjs(item.createdAt).format('DD-MM-YYYY HH:mm')}
                            {item.name}
                        </div>
                    </div>
                </div>
            </div>
            <p className='mt-5'>{item.content}</p>
        </div>
    );
};

export default memo(ReviewItem);
