import { MAIN_ROUTES } from '~/constants/router';
import { useCart } from '~/hooks/_common/useCart';
import { useMutationRemoveItem } from '~/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '~/hooks/cart/Mutations/useUpdateQuantity';
import { Currency } from '~/utils/FormatCurreny';
import { CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, Image, InputNumber, List, message, Popconfirm, PopconfirmProps } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
    children: React.ReactNode;
    data: any;
    isFetching: boolean;
};
const CartDrawer = ({ data, isFetching, children }: PropsType) => {
    const { cart, handleOpenCart, onClose } = useCart();
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const { handleRemoveCart, isPending } = useMutationRemoveItem();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const [quantityProduct, setQuantityProduct] = useState<{ quantity: number; id: string }[]>([]);
    const [pendingUpdates, setPendingUpdates] = useState<{
        productId: string;
        variantId: string;
        quantity: number;
    } | null>(null);
    useEffect(() => {
        if (data && !isFetching) {
            const newArr = data.items.map(({ quantity, variantId }: any) => ({
                quantity,
                id: variantId,
            }));
            setQuantityProduct(newArr);
        }
    }, [data, isFetching]);
    const handleChangeQuantity = (productId: string, variantId: string, newQuantity: number) => {
        setQuantityProduct((prev: any) =>
            prev.map((itemCart: any) => (itemCart.id === variantId ? { ...itemCart, quantity: newQuantity } : itemCart))
        );
        setPendingUpdates({
            productId: productId,
            variantId: variantId,
            quantity: newQuantity,
        });
    };
    /* eslint-disable */
    const debouncedUpdate = useCallback(
        debounce(async (payload) => {
            await updateQuantity(payload);
        }, 500),
        []
    );
    /* eslint-disable */
    useEffect(() => {
        if (pendingUpdates) {
            debouncedUpdate({
                ...pendingUpdates,
            });
        }
    }, [pendingUpdates, debouncedUpdate]);
    const handleIncreaseQuantity = (productId: string, variantId: string) => {
        setQuantityProduct((prev) => {
            if (!prev) return [];
            return prev.map((itemCart) =>
                itemCart.id === variantId ? { ...itemCart, quantity: itemCart.quantity + 1 } : itemCart
            );
        });
        const newQuantity = (quantityProduct.find((itemCart) => itemCart.id === variantId)?.quantity || 0) + 1;
        handleChangeQuantity(productId, variantId, newQuantity);
    };
    const handleDecreaseQuantity = (productId: string, variantId: string) => {
        setQuantityProduct((prev) => {
            if (!prev) return [];
            const itemFill = prev.find((itemCart) => itemCart.id === variantId);
            if (itemFill && itemFill.quantity > 1) {
                return prev.map((itemCart) =>
                    itemCart.id === variantId ? { ...itemCart, quantity: itemCart.quantity - 1 } : itemCart
                );
            }
            return prev;
        });
        const newQuantity = (quantityProduct.find((itemCart) => itemCart.id === variantId)?.quantity || 0) - 1;
        handleChangeQuantity(productId, variantId, newQuantity);
    };
    const totalPrice = data?.items?.reduce((total: number, item: any) => {
        return total + item.price * item.quantity;
    }, 0);

    const confirm: PopconfirmProps['onConfirm'] = (variantId: any) => {
        handleRemoveCart(variantId);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className={'cursor-pointer'} onClick={handleOpenCart}>
                {children}
            </span>
            <Drawer
                title={
                    <>
                        {/* <div className='h-[4px] w-full'>{isPending && <LoadingBar />}</div> */}
                        <div className='flex items-center justify-between'>
                            <div className='font-bold text-black uppercase'>Giỏ Hàng</div>
                            <Button type='text' onClick={onClose}>
                                <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                            </Button>
                        </div>
                    </>
                }
                width={'35vw'}
                placement='right'
                closable={false}
                onClose={onClose}
                open={cart}
                // className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                {data && data.items.length > 0 && (
                    <>
                        <List
                            itemLayout='vertical'
                            className='h-[40vh] w-full overflow-x-hidden overflow-y-scroll'
                            dataSource={data.items}
                            renderItem={(product: any) => {
                                const quantity =
                                    quantityProduct?.find((p) => p.id === product.variantId)?.quantity || 0;
                                return (
                                    <List.Item key={product._id}>
                                        <div className='flex w-full items-center justify-between'>
                                            <List.Item.Meta
                                                avatar={
                                                    <Image
                                                        className='w-[80px] max-w-[80px] rounded-md'
                                                        src={product.image}
                                                    />
                                                }
                                                description={
                                                    <>
                                                        <Link
                                                            className='text-global hover:text-hover text-base font-medium'
                                                            to={`${MAIN_ROUTES.PRODUCTS}/${product?.productId}`}
                                                        >
                                                            {product?.name}
                                                        </Link>
                                                        <div className='flex justify-between'>
                                                            <div className='flex w-full items-center justify-between'>
                                                                <div className='flex flex-col'>
                                                                    <div className='flex flex-col'>
                                                                        <span>
                                                                            Size:
                                                                            {' ' + product.size}
                                                                        </span>
                                                                        <span>
                                                                            Màu:
                                                                            {' ' + product.color}
                                                                        </span>
                                                                    </div>
                                                                    <div className='flex items-center gap-2'>
                                                                        <span
                                                                            className={clsx(
                                                                                'text-base leading-5 font-semibold text-[#222]'
                                                                                // {
                                                                                //     'text-red-600':
                                                                                //         product.productId.discountPercentage > 0,
                                                                                // }
                                                                            )}
                                                                        >
                                                                            {Currency(product.price)}
                                                                        </span>
                                                                        <span className='text-hover rounded-sm border-[1px] px-1 py-0.5 text-xs'>
                                                                            -{product.discount}%
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='ml-5 flex items-center justify-center'>
                                                                    <Button
                                                                        disabled={quantity < 2}
                                                                        type='default'
                                                                        icon={
                                                                            <MinusOutlined className='transform transition duration-500 hover:rotate-180' />
                                                                        }
                                                                        onClick={() =>
                                                                            handleDecreaseQuantity(
                                                                                product.productId,
                                                                                product.variantId
                                                                            )
                                                                        }
                                                                    />
                                                                    <ConfigProvider
                                                                        theme={{
                                                                            token: {
                                                                                colorBgContainerDisabled: 'white',
                                                                                colorTextDisabled: 'black',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <InputNumber
                                                                            min={1}
                                                                            disabled={true}
                                                                            style={{ paddingLeft: '17%' }}
                                                                            className=''
                                                                            value={quantity}
                                                                        />
                                                                    </ConfigProvider>

                                                                    <Button
                                                                        disabled={quantity === product.stock}
                                                                        onClick={() =>
                                                                            handleIncreaseQuantity(
                                                                                product.productId,
                                                                                product.variantId
                                                                            )
                                                                        }
                                                                        type='default'
                                                                        icon={
                                                                            <PlusOutlined className='transform transition duration-500 hover:rotate-180' />
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            />
                                            <Popconfirm
                                                title='Thông báo'
                                                description='Bạn có chắc là muốn xóa sản phẩm này khỏi giỏ hàng?'
                                                onConfirm={() => confirm(product.variantId)}
                                                placement='leftTop'
                                                okText='Đồng ý'
                                                cancelText='Hủy'
                                            >
                                                <Button
                                                    loading={isPending}
                                                    type='text'
                                                    className='mb-20 text-indigo-600 hover:text-indigo-500'
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    </List.Item>
                                );
                            }}
                        />

                        <div className='border-t border-gray-200 px-4 py-6'>
                            <div className='flex justify-between text-base font-bold text-gray-900'>
                                <p className='text-global text-sm font-semibold uppercase'>Tổng đơn hàng:</p>
                                <p className='text-base text-orange-500'>{Currency(totalPrice)}</p>
                            </div>
                            <div className='mt-6'>
                                <Link to={MAIN_ROUTES.CART}>
                                    <button
                                        onClick={onClose}
                                        className='hover:border-hover hover:text-hover h-[50px] w-full cursor-pointer rounded-md border-[1px] bg-white text-sm font-semibold text-black uppercase transition-colors duration-300'
                                    >
                                        Xem giỏ hàng
                                    </button>
                                </Link>
                            </div>

                            <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                                <p className='text-global'>
                                    Hoặc{' '}
                                    <button
                                        className='hover:text-global ml-1 font-medium text-orange-500 duration-300'
                                        onClick={onClose}
                                    >
                                        Tiếp tục mua hàng
                                    </button>
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {!data && (
                    <div className='flex min-h-[60vh] flex-col items-center justify-center'>
                        <img src='https://canifa.com/assets/images/cart-empty.png' alt='' />
                        <p className='text-global text-center text-xl leading-6 font-medium'>
                            Giỏ hàng hiện không có sản phẩm.
                        </p>
                        <button
                            onClick={onClose}
                            className='mt-12 h-[48px] rounded-md border-[1px] border-[#da291c] px-12 font-bold text-[#da291c]'
                        >
                            Tiếp tục mua hàng
                        </button>
                    </div>
                )}
                {data?.items?.length === 0 && (
                    <div className='flex min-h-[60vh] flex-col items-center justify-center'>
                        <img src='https://canifa.com/assets/images/cart-empty.png' alt='' />
                        <p className='text-global text-center text-xl leading-6 font-medium'>
                            Giỏ hàng hiện không có sản phẩm.
                        </p>
                        <button
                            onClick={onClose}
                            className='mt-12 h-[48px] rounded-md border-[1px] border-[#da291c] px-12 font-bold text-[#da291c]'
                        >
                            Tiếp tục mua hàng
                        </button>
                    </div>
                )}
            </Drawer>
        </motion.div>
    );
};

export default CartDrawer;
