import { Space } from 'antd';
import { Link } from 'react-router-dom';
import { ORDER_STATUS } from '~/constants/order';
import CancelOrderModal from './CancelOrderModal';
import PopConfirmDeliveredOrder from './PopConfirmDeliveredOrder';
import PopConFirmOrder from './PopConfirmOrder';
import PopConfirmShipping from './PopConfirmShipping';

interface Props {
    orderStatus: string;
    id: string;
}

const OrderDetailNavbar = ({ orderStatus, id }: Props) => {
    return (
        <Space className='flex w-full items-center justify-between rounded-lg bg-[#fff] p-4 font-semibold'>
            <div className='flex flex-col gap-2'>
                <Link to={'/admin/orders'} className='text-xs'>
                   	&lt; Quay về danh sách
                </Link>
                <span>Thông tin đơn hàng #{id}</span>
            </div>
            {orderStatus === ORDER_STATUS.PENDING && (
                <Space>
                    <PopConFirmOrder orderId={id} />
                    <CancelOrderModal status={orderStatus} orderId={id!} />
                </Space>
            )}
            {orderStatus === ORDER_STATUS.CONFIRMED && (
                <Space>
                    <PopConfirmShipping orderId={id} />
                    <CancelOrderModal status={orderStatus} orderId={id!} />
                </Space>
            )}
            {orderStatus === ORDER_STATUS.SHIPPING && (
                <Space>
                    <PopConfirmDeliveredOrder orderId={id} />
                    <CancelOrderModal status={orderStatus} orderId={id!} />
                </Space>
            )}
            {/* {orderStatus === ORDER_STATUS.DELIVERED && (
                <>
                    <PopConfirmFinishOrder orderId={id} />
                </>
            )} */}
        </Space>
    );
};

export default OrderDetailNavbar;
