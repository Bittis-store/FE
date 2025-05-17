import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import CancelOrderModal from './CancelOrderModal';
import CustomerInfo from './CustomerInfo';
import OrderStatusBar from './OrderStatusBar';
import ServiceInfo from './ServiceInfo';
import TableOrderItems from './TableOrderItems';
import OrderDetailNavbar from './OrderDetailNavbar';

const OrderDetail = () => {
    const { id } = useParams();
    const { data } = useOrderDetails(id!);

    const orderStatus = data?.orderStatus;

    const customerInfo = data && data?.customerInfo;
    const receiverInfo = data && data?.receiverInfo;
    const shippingAddress = data && data?.shippingAddress;

    const serviceInfo = {
        paymentMethod: data?.paymentMethod || '',
        shippingFee: data?.shippingFee || '',
        tax: data?.tax || '',
        totalPrice: data?.totalPrice || '',
        isPaid: data?.isPaid || '',
        voucherDiscount: data?.voucherDiscount || null,
        discountType: data?.discountType || null,
        voucherName: data?.voucherName || null,
        voucherCode: data?.voucherCode || '',
    };
    const description = data?.description || '';

    const orderItems = data?.items || [];

    console.log(orderItems);

    return (
        <>
            <OrderDetailNavbar orderStatus={orderStatus} id={id!} />

            {orderStatus !== 'cancelled' ? (
                <OrderStatusBar orderStatus={orderStatus} />
            ) : (
                <Space className='mt-5 flex w-full flex-col items-center justify-center rounded-lg bg-[#fff] p-4 font-semibold'>
                    <Space align='center' direction='vertical'>
                        <h2 className='text-rose-500'>
                            Đơn hàng bị hủy bởi{' '}
                            {data?.canceledBy === 'admin' ? <span>Quản trị viên</span> : <span>Khách hàng</span>}
                        </h2>
                        <p className='font-normal'>{data?.description}</p>
                    </Space>
                </Space>
            )}
            <ServiceInfo totalItems={orderItems.length} serviceInfo={serviceInfo} description={description} />
            <CustomerInfo customerInfo={customerInfo} receiverInfo={receiverInfo} shippingAddress={shippingAddress} />

            <TableOrderItems serviceInfo={serviceInfo} orderItems={orderItems} />
        </>
    );
};

export default OrderDetail;
