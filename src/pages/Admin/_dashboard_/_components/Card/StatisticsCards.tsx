// StatisticsCards.tsx
import React, { useRef, useState } from 'react';
import { Carousel, Button } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ShoppingOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import CardDataStats from './CardDataStats';
import DatePickerCard from '../DatePickerCard/DatePickerCard';
import moment from 'moment';
import { useTotalStats } from '~/hooks/stats/useTotal';
import { Currency } from '~/utils';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const StatisticsCards: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({ type: 'single', date: moment().format('YYYY-MM-DD') });
    const { data, isLoading, error } = useTotalStats(dateInput);
    const carouselRef = useRef<CarouselRef>(null);

    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };
    if (isLoading) return <div className='flex h-screen items-center justify-center'>Loading...</div>;
    if (error)
        return <div className='flex h-screen items-center justify-center text-red-500'>Error: {error.message}</div>;
    const statsData: any = data?.data?.data || {};
    console.log(statsData);
    const cardData = [
        {
            title: 'Tổng đơn hàng',
            total: statsData.totalOrders || 0,
            rate: `${(statsData.orderSuccessRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderSuccessRate || 0) > 50,
            levelDown: (statsData.orderSuccessRate || 0) <= 50,
            subtitle: `Thành công: ${statsData.successfulOrders || 0} | Đã hủy: ${statsData.cancelledOrders || 0}`,
            icon: <ShoppingCartOutlined />,
            tooltip: 'Tổng số đơn hàng được đặt trong khoảng thời gian đã chọn',
            rateTooltip: 'Tỷ lệ thành công trong khoảng thời gian đã chọn',
        },
        {
            title: 'Tổng doanh thu',
            total: Currency.format(statsData.totalRevenue || 0),
            rate: Currency.format(statsData.averageDailyRevenue || 0),
            subtitle: 'Doanh thu trung bình ',
            icon: <DollarCircleOutlined />,
            tooltip: 'Tổng doanh thu trong khoảng thời gian đã chọn',
            rateTooltip: 'Doanh thu trung bình hàng ngày trong khoảng thời gian đã chọn',
        },
        {
            title: 'Người dùng mới',
            total: statsData.newUsers || 0,
            rate: `${(statsData.orderCancelRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderCancelRate || 0) < 30,
            levelDown: (statsData.orderCancelRate || 0) >= 30,
            subtitle: 'Tỷ lệ hủy đơn',
            icon: <UserOutlined />,
            tooltip: 'Số lượng người dùng đăng ký mới trong khoảng thời gian đã chọn',
            rateTooltip: 'Tỷ lệ hủy đơn trong khoảng thời gian đã chọn',
        },
        {
            title: 'Sản phẩm mới',
            total: statsData.newProducts || 0,
            icon: <ShoppingOutlined />,
            tooltip: 'Số lượng sản phẩm mới được thêm vào trong khoảng thời gian đã chọn',
        },
    ];

    const NavigationButton = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) => (
        <Button
            type='default'
            shape='circle'
            icon={direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
            onClick={onClick}
            className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 ${direction === 'left' ? '-left-4' : '-right-4'}`}
        />
    );

    return (
        <>
            <div className='mb-3 ml-3'>
                <DatePickerCard onDateChange={handleDateChange} initialDate={dateInput} />
            </div>
            <div className='relative'>
                <NavigationButton direction='left' onClick={() => carouselRef.current?.prev()} />
                <NavigationButton direction='right' onClick={() => carouselRef.current?.next()} />

                <div className='px-4'>
                    <Carousel
                        ref={carouselRef}
                        dots={false}
                        slidesToShow={3}
                        slidesToScroll={1}
                        autoplay={false}
                        className='!-mx-2'
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 640,
                                settings: {
                                    slidesToShow: 1,
                                },
                            },
                        ]}
                    >
                        {cardData.map((card, index) => (
                            <div key={index} className='px-2'>
                                <CardDataStats {...card} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
};

export default StatisticsCards;
