import { LeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import OrderStatusBar from '~/pages/Admin/_order_/OrderDetails/OrderStatusBar';
import ActionLink from '~/pages/client/Account/MyOrders/Components/ActionLink';
import ReceiverInfor from '~/pages/client/Account/MyOrders/OrderDetail/_Components/ReceiverInfor';
import ServicesDetail from '~/pages/client/Account/MyOrders/OrderDetail/_Components/ServicesDetail';
import TableDetailOrder from '~/pages/client/Account/MyOrders/OrderDetail/_Components/TableDetailOrder';
import { IOrderItem } from '~/types/Order';
import { formatDate } from '~/utils/formatDate';
import ReviewModal from './_Components/ReviewModal';
import { useState } from 'react';

const OrderDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useOrderDetails(id!);
    const [productId, setProductId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const orderStatus = data?.orderStatus;

    const receiverInfo = data?.paymentMethod === 'card' ? data?.customerInfo : data?.receiverInfo;
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

    const orderItems = data?.items || [];
    const getTotalQuantity = (items: IOrderItem[]): number => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const showModal = (productIdParams: string) => {
        setIsModalOpen(true);
        setProductId(productIdParams);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {!isLoading && (
                <WrapperList
                    title={`Chi tiết đơn hàng #${id}`}
                    option={
                        <Link to={MAIN_ROUTES.MY_ORDERS}>
                            <LeftOutlined /> Quay Trở Về Danh Sach
                        </Link>
                    }
                >
                    <Space className='flex w-full items-center justify-between rounded-lg bg-[#fff] p-4 font-semibold'>
                        <span>Ngày Đặt Đơn Hàng: {formatDate(data?.createdAt)} </span>
                        <div className='mt-2 ml-4'>
                            <ActionLink orderId={id!} status={orderStatus} />
                        </div>
                    </Space>
                    {orderStatus !== 'cancelled' ? (
                        <>
                            <OrderStatusBar orderStatus={orderStatus} />
                        </>
                    ) : (
                        <Space className='mt-5 flex w-full flex-col items-center justify-center rounded-lg bg-[#fff] p-4 font-semibold'>
                            <Space align='center' direction='vertical'>
                                <h2 className='text-rose-500'>
                                    Đơn hàng đã bị hủy bởi {data?.canceledBy === 'admin' && <span>admin</span>}
                                    {data?.canceledBy === 'user' && <span>người dùng</span>}
                                    {data?.canceledBy === 'system' && <span>hệ thống</span>}
                                    {data?.canceledBy === 'none' && <span>hệ thống</span>}
                                </h2>
                                <p className='font-normal'>
                                    {data?.canceledBy === 'system' ? 'Thanh toán thất bại' : data?.description}
                                </p>
                            </Space>
                            <Space></Space>
                        </Space>
                    )}
                    <ReceiverInfor
                        receiverInfo={receiverInfo}
                        shippingAddress={shippingAddress}
                        description={data.description}
                    />
                    <ServicesDetail services={serviceInfo} totalQuantity={getTotalQuantity(orderItems)} />
                    <TableDetailOrder orderItems={orderItems} status={orderStatus} showModal={showModal} />
                </WrapperList>
            )}
            <ReviewModal
                isModalOpen={isModalOpen}
                orderId={id as string}
                productId={productId}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />
        </>
    );
};

export default OrderDetailPage;
