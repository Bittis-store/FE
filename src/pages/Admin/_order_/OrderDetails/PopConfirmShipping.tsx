import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useShippingOrder } from '~/hooks/orders/Mutations/useShippingOrder';

interface Props {
    orderId: string;
}

const PopConfirmShipping = ({ orderId }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const shippingOrder = useShippingOrder();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        if (!shippingOrder.isPending) {
            setOpen(false);

            shippingOrder.mutate(orderId, {
                onSuccess: () => {
                    toast.success('Đơn hàng đang trong quá trình vận chuyển');
                    navigate(`/admin/orders/${orderId}/detail`);
                    // setOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Popconfirm
            title='Xác nhận đã giao hàng cho đơn vị vận chuyển'
            description='Bạn muốn xác nhận vận chuyển cho đơn hàng này?'
            open={open}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Button type='default' loading={shippingOrder.isPending} onClick={showPopconfirm}>
                Bắt đầu quá trình giao hàng
            </Button>
        </Popconfirm>
    );
};

export default PopConfirmShipping;
