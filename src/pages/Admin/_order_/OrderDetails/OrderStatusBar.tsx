import { Space, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { ORDER_STATUS } from '~/constants/order';
import { MdOutlinePendingActions } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { RiUserReceivedLine } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';

interface Props {
    orderStatus: string;
}

const OrderStatusBar = ({ orderStatus }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const handleStepChange = () => {
        switch (orderStatus) {
            case ORDER_STATUS.PENDING:
                return setCurrentStep(0);
            case ORDER_STATUS.CONFIRMED:
                return setCurrentStep(1);
            case ORDER_STATUS.SHIPPING:
                return setCurrentStep(2);
            case ORDER_STATUS.DELIVERED:
                return setCurrentStep(3);
            case ORDER_STATUS.DONE:
                return setCurrentStep(4);
            default:
                return 0;
        }
    };

    useEffect(() => {
        handleStepChange();
    }, [orderStatus]);

    return (
        <Space className="mt-5 flex w-full items-center justify-center rounded-md bg-[#fff] p-4">
            <Steps
                size="small"
                current={currentStep}
                className="w-[66vw]"
                items={[
                    {
                        title: 'Chờ xác nhận',
                        className: 'text-primary',
                        icon: <MdOutlinePendingActions />,
                    },
                    {
                        title: 'Đã xác nhận',
                        className: 'text-primary',
                        icon: <GiConfirmed />,
                    },
                    {
                        title: 'Đang giao',
                        className: 'text-primary',
                        icon: <LiaShippingFastSolid />,
                    },
                    {
                        title: 'Đã giao hàng',
                        className: 'text-primary',
                        icon: <RiUserReceivedLine />,
                    },
                    {
                        title: 'Hoàn thành',
                        className: 'text-primary',
                        icon: <FaStar />,
                    },
                ]}
            />
        </Space>
    );
};

export default OrderStatusBar;
