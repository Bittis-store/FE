import { CheckCircleFilled, CloseCircleFilled, CreditCardFilled, PercentageOutlined } from '@ant-design/icons';
import { Card, DescriptionsProps, Input, Space } from 'antd';
import { PaymentMethod } from '~/constants/enum';
import { Currency } from '~/utils';

interface Props {
    services: {
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
    totalQuantity: number;
    description: string;
}

const translatePaymentMethod = (method: string) => {
    const translations: { [key in string]: string } = {
        [PaymentMethod.card]: 'Thanh toán online',
        [PaymentMethod.cash]: 'COD',
        // Add more translations as needed
    };
    return translations[method] || method; // Fallback to original if not found
};

export default function ServicesDetail({ services, totalQuantity, description }: Props) {
    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'cash':
                return 'Thanh toán khi nhận hàng';
            case 'card':
                return 'Thanh toán Online';
            default:
                return 'Phương thức thanh toán khác';
        }
    };

    const infoCards = [
        {
            icon: <CreditCardFilled className='text-2xl text-blue-500' />,
            label: 'Phương thức thanh toán',
            value: getPaymentMethodLabel(services.paymentMethod),
            className: 'from-blue-50 to-indigo-50',
        },
        {
            icon: <PercentageOutlined className='text-2xl text-yellow-500' />,
            label: 'Phí vận chuyển',
            value: `${services.shippingFee.toLocaleString()} VNĐ`,
            className: 'from-yellow-50 to-amber-50',
        },
        {
            icon: <img src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png' className={`w-7`} alt='' />,
            label: `Mã giảm giá ${services.voucherCode && `${services.voucherCode}`}`,
            value: `${services.voucherCode ? `${services.voucherDiscount.toLocaleString()} VNĐ` : '0 VNĐ'}`,
            className: 'from-red-50 to-red-50',
        },
    ];

    return (
        <Card
            className='mt-2 w-full overflow-hidden rounded-2xl border-gray-100 shadow-sm'
            title={
                <div className='flex items-center justify-between py-2'>
                    <h2 className='text-xl font-semibold text-gray-800'>Thông tin dịch vụ</h2>
                    <div className='flex items-center gap-2'>
                        {services.isPaid ? (
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
}
