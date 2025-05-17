import {
    CheckCircleFilled,
    CloseCircleFilled,
    CreditCardFilled,
    DollarCircleFilled,
    PercentageOutlined,
    TruckFilled,
} from '@ant-design/icons';
import { Card, Input, Space } from 'antd';
import React from 'react';
import { Currency } from '~/utils';

interface Props {
    totalItems: number;
    serviceInfo: {
        paymentMethod: string;
        shippingFee: number;
        tax: number;
        totalPrice: number;
        isPaid: boolean;
        voucherDiscount: number;
        discountType: string;
        voucherName: string;
        voucherCode: string;
    };
    description: string;
}

const ServiceInfo: React.FC<Props> = ({ serviceInfo, description, totalItems }) => {
    const infoCards = [
        {
            icon: <CreditCardFilled className='text-2xl text-blue-500' />,
            label: 'Phương thức thanh toán',
            value: serviceInfo.paymentMethod === 'cash' ? 'Thanh toán khi nhận hàng' : 'Thanh toán Online',
            className: 'from-blue-100 to-indigo-50',
        },

        {
            icon: <PercentageOutlined className='text-2xl text-yellow-500' />,
            label: 'Thuế',
            value: `${Number(serviceInfo.tax) * 100}% VAT`,
            className: 'from-yellow-100 to-amber-50',
        },
        {
            icon: <TruckFilled className='text-2xl text-green-500' />,
            label: 'Cước phí vận chuyển',
            value: Currency.format(serviceInfo.shippingFee),
            className: 'from-green-100 to-emerald-50',
        },
        {
            icon: <img src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png' alt='' className='w-6' />,
            label: `Mã giảm giá ${serviceInfo.voucherCode && `(${serviceInfo.voucherCode})`}`,
            value: Currency.format(serviceInfo.voucherDiscount),
            className: 'from-pink-100 to-fuchsia-50',
        },
        {
            icon: <DollarCircleFilled className='text-2xl text-purple-500' />,
            label: 'Tổng tiền',
            value: Currency.format(serviceInfo.totalPrice),
            className: 'from-red-100 to-fuchsia-50',
        },
        {
            icon: <DollarCircleFilled className='text-2xl text-purple-500' />,
            label: 'Số lượng sản phẩm',
            value: totalItems,
            className: 'from-purple-100 to-fuchsia-50',
        },
    ];

    return (
        <Card
            className='mt-2 w-full overflow-hidden rounded-2xl border-gray-100 shadow-sm'
            title={
                <div className='flex items-center justify-between py-2'>
                    <h2 className='text-xl font-semibold text-gray-800'>Thông tin dịch vụ</h2>
                    <div className='flex items-center gap-2'>
                        {serviceInfo.isPaid ? (
                            <>
                                <CheckCircleFilled className='text-lg text-green-500' />
                                <span className='font-medium text-green-600'>Đã thanh toán</span>
                            </>
                        ) : (
                            <>
                                <CloseCircleFilled className='text-lg text-red-500' />
                                <span className='font-medium text-red-600'>Chưa thanh toán</span>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Space direction='vertical' className='w-full' size='large'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    {infoCards.map((info, index) => (
                        <div
                            key={index}
                            className={`rounded-xl bg-gradient-to-r p-4 ${info.className} border border-gray-100`}
                        >
                            <div className='flex items-start gap-3'>
                                <div className='rounded-lg bg-white p-2 shadow-sm'>{info.icon}</div>
                                <div className='flex-1'>
                                    <p className='mb-1 text-sm text-gray-600'>{info.label}</p>
                                    <p className='text-lg font-semibold text-gray-800'>{info.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-4'>
                    <h3 className='mb-3 text-lg font-medium text-gray-700'>Ghi chú đơn hàng</h3>
                    <Input.TextArea
                        className='rounded-xl border-gray-200 bg-gray-50'
                        rows={3}
                        readOnly
                        value={description || 'Không có ghi chú nào cho đơn hàng này'}
                        style={{
                            resize: 'none',
                            fontSize: '0.95rem',
                            color: description ? '#374151' : '#6B7280',
                        }}
                    />
                </div>
            </Space>
        </Card>
    );
};

export default ServiceInfo;
