import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    List,
    Typography,
    Divider,
    Tag,
    Image,
    Space,
    Checkbox,
    CheckboxProps,
    Tooltip,
    Row,
    Col,
    Radio,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useTypedSelector } from '~/store/store';
import { useCreateOrder } from '~/hooks/orders/Mutations/useCreateOrder';
import showMessage from '~/utils/ShowMessage';
import PolicyModal from '~/components/PolicyModal';
import { RadioChangeEvent } from 'antd/lib';
import { useVnPayOrder } from '~/hooks/orders/Mutations/useVnPayOrder';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';

const { Text, Title } = Typography;

const ProductItemsCheckout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: cartUser, refetch } = useGetMyCart();

    const cartItems = useTypedSelector((state) => state.cartReducer.items);
    const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<number>(0);
    const createOrderVnPay = useVnPayOrder();
    const { description, receiverInfo, shippingAddress, tax, shippingFee } = useSelector(
        (state: RootState) => state.order
    );
    const userId = useTypedSelector((state) => state.auth.user?._id);
    const subTotal = cartItems?.reduce((acc: any, item: any) => acc + +item.price * item.quantity, 0) || 0;

    const totalPrice = subTotal + shippingFee;
    const createOrder = useCreateOrder();

    useEffect(() => {
        const idProductCart = cartItems.map((item: any) => item.productId) || [];
        const idProductCartCheckout = cartUser?.items.map((item) => item.productId) || [];

        const hasProductHide = idProductCart.some((item) => !idProductCartCheckout.includes(item));
        if (hasProductHide) {
            refetch();
            navigate('/cart');
        }
    });

    const handleCheckout = () => {
        if (paymentMethod === 0) {
            createOrder.mutate(
                {
                    items: cartItems as [],
                    customerInfo: receiverInfo.customer,
                    receiverInfo: receiverInfo.addReceiver,
                    description: description ?? '',
                    shippingAddress: {
                        province: shippingAddress.province,
                        district: shippingAddress.district,
                        ward: shippingAddress.ward,
                        address: shippingAddress.address,
                        provinceId: shippingAddress.provinceId!,
                        districtId: shippingAddress.districtId!,
                        wardCode: shippingAddress.wardCode,
                    },
                    totalPrice,
                    tax,
                    shippingFee,
                    paymentMethod: 'cash',
                },
                {
                    onSuccess: () => {
                        navigate('/success?vnp_ResponseCode=00');
                    },
                    onError: (error: any) => {
                        showMessage(error.response.data.message, 'error');
                    },
                }
            );
        } else if (paymentMethod === 1) {
            createOrderVnPay.mutate({
                userId: userId,
                items: cartItems as [],
                customerInfo: receiverInfo.customer,
                receiverInfo: receiverInfo.addReceiver,
                description: description ?? '',
                shippingAddress: {
                    province: shippingAddress.province,
                    district: shippingAddress.district,
                    ward: shippingAddress.ward,
                    address: shippingAddress.address,
                    provinceId: shippingAddress.provinceId!,
                    districtId: shippingAddress.districtId!,
                    wardCode: shippingAddress.wardCode,
                },
                totalPrice,
                tax,
                shippingFee,
                paymentMethod: 'card',
            });
        } else {
            showMessage('Vui lòng chọn phương thức thanh toán', 'warning');
        }
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);

    const onChange: CheckboxProps['onChange'] = (e) => {
        setPolicyAgreed(e.target.checked);
    };
    const onChangePaymentMethod = (e: RadioChangeEvent) => {
        setPaymentMethod(e.target.value);
    };
    const { data } = useGetMyCart();
    useEffect(() => {
        if (data && cartItems) {
            const isAnyItemRemoved = cartItems.some(
                (item) => !data.items.some((cartDataItem) => cartDataItem._id === item._id)
            );
            if (isAnyItemRemoved) {
                navigate('/');
                showMessage('Có sự thay đổi về sản phẩm vui lòng kiểm tra lại giỏ hàng', 'info', 3000);
            }
        }
    }, [data]);
    return (
        <div className='flex h-full flex-col'>
            <Title level={4} className='mb-4'>
                Đơn hàng của bạn
            </Title>

            <div className='mb-4 flex-grow overflow-auto' style={{ maxHeight: '400px' }}>
                <List
                    itemLayout='horizontal'
                    dataSource={cartItems}
                    renderItem={(item: any) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image width={60} src={item.image} preview={false} />}
                                title={<Text strong>{item.name}</Text>}
                                description={
                                    <>
                                        <Space wrap>
                                            <Tag color='blue'>Màu sắc: {item.color}</Tag>
                                            <Tag color='blue'>Kích cỡ: {item.size}</Tag>
                                        </Space>
                                        <div className='mt-2'>
                                            <Text>Đơn giá: {formatCurrency(item.price)}</Text>
                                            <Text className='ml-4'>Số lượng: {item.quantity}</Text>
                                        </div>
                                    </>
                                }
                            />
                            <div>
                                <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            <div>
                <Divider />

                <Space direction='vertical' className='w-full'>
                    <div className='flex justify-between'>
                        <Text>Tạm tính:</Text>
                        <Text>{formatCurrency(subTotal)}</Text>
                    </div>

                    <div className='flex justify-between'>
                        <Text>Phí vận chuyển:</Text>
                        <Text>{formatCurrency(shippingFee)}</Text>
                    </div>

                    <div className='mt-2'>
                        <h3 className='text-lg font-semibold'>Phương thức thanh toán</h3>
                        <div className='mt-2'>
                            <Radio.Group
                                className='flex flex-col gap-2'
                                defaultValue={paymentMethod}
                                onChange={onChangePaymentMethod}
                            >
                                <Radio value={0}>Thanh toán khi nhận hàng</Radio>
                                {/* <Radio value={1}>Thanh toán online qua VNPay</Radio> */}
                            </Radio.Group>
                        </div>
                    </div>
                    <Row justify='space-between' align='middle'>
                        <h3 className='text-2xl font-semibold'>Tổng cộng:</h3>
                        <h3 className='text-2xl font-semibold text-red-500'>{formatCurrency(totalPrice)}</h3>
                    </Row>
                </Space>

                <Checkbox onChange={onChange} defaultChecked={false} className='mt-4 cursor-default'>
                    Tôi đồng ý với <PolicyModal />
                </Checkbox>
                <Card className='mt-4 border-blue-200 bg-blue-50'>
                    <Tooltip
                        title={
                            policyAgreed
                                ? ''
                                : 'Bạn cần đồng ý với điều khoản và chính sách của chúng tôi để tiếp tục đặt hàng'
                        }
                        color='blue'
                    >
                        <Button
                            type='primary'
                            loading={createOrder.isPending}
                            size='large'
                            block
                            onClick={handleCheckout}
                            className='h-12 text-lg font-semibold'
                            disabled={!policyAgreed || createOrderVnPay.isSuccess}
                        >
                            Đặt hàng
                        </Button>
                    </Tooltip>
                </Card>
            </div>
        </div>
    );
};

export default ProductItemsCheckout;
