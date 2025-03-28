import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
import { useMutationRemoveItem } from '~/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '~/hooks/cart/Mutations/useUpdateQuantity';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { addItems, removeAll, removeItems, setItemsCart, updateItemsCart } from '~/store/slice/cartSlice';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import { ICartItemsResponse } from '~/types/Cart/CartResponse';
import { Currency } from '~/utils';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    ConfigProvider,
    Form,
    Image,
    InputNumber,
    message,
    Popconfirm,
    PopconfirmProps,
    Table,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { TableProps } from 'antd/lib';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';

export default function CartDetail() {
    useDocumentTitle('BITTIS-STORE - Chi tiết giỏ hàng');
    const { data: products, isLoading } = useGetMyCart();
    const {
        mutate: removeAllItems,
        isPending: pendingRemoveAll,
        reset: resetRemoveAll,
        status: statusRemoveAll,
    } = useRemoveAll();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const { handleRemoveCart, status, reset, isPending } = useMutationRemoveItem();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItem = useTypedSelector((state) => state.cartReducer.items);
    const totalOrderAmount = cartItem
        ? cartItem.reduce((total: number, product) => total + product.price * product.quantity, 0)
        : 0;
    const [quantityProduct, setQuantityProduct] = useState<{ quantity: number; id: string }[]>([]);
    const [pendingUpdates, setPendingUpdates] = useState<{
        productId: string;
        variantId: string;
        quantity: number;
    } | null>(null);
    const toast = useToast();
    // useEffect for redux
    const findItemsActive = products?.items.filter((v) => v.stock > 0);
    useEffect(() => {
        if (cartItem) {
            cartItem.forEach((item) => {
                {
                    products?.items.forEach((product) => {
                        if (product._id === item._id) {
                            if (product.quantity !== item.quantity) {
                                dispatch(updateItemsCart(product));
                            }
                        }
                    });
                }
            });
        }
    }, [products]);
    //
    useEffect(() => {
        if (products) {
            if (products) {
                const newArr = products?.items.map(({ quantity, _id }) => ({
                    quantity,
                    id: _id,
                }));
                setQuantityProduct(newArr);
                dispatch(setItemsCart(findItemsActive!));
            }
        }
    }, [products]);
    const productIdArray = products?.items.map((item) => item._id);
    const productsIdRef = useRef(productIdArray);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const productIdArray = products?.items.map((item) => item._id);
        if (
            productIdArray?.length !== productsIdRef.current?.length &&
            status === 'idle' &&
            statusRemoveAll === 'idle'
        ) {
            toast('info', 'Có sự thay đổi về sản phẩm vui lòng kiểm tra lại giỏ hàng');
        }
        productsIdRef.current = productIdArray;
    }, [products]);
    useEffect(() => {
        setTimeout(() => {
            reset();
            resetRemoveAll();
        }, 300);
    }, [status]);
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
        debounce(async (payload: any) => {
            await updateQuantity(payload);
        }, 500),
        []
    );
    /* eslint-disable */

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
    /* eslint-disable */
    useEffect(() => {
        if (pendingUpdates) {
            debouncedUpdate({
                ...pendingUpdates,
            });
        }
    }, [pendingUpdates, debouncedUpdate]);
    /* eslint-enable */
    const onchangeItemsChecked = (e: CheckboxChangeEvent, productVariation: ICartItemsResponse) => {
        if (!e.target.checked) {
            dispatch(removeItems(productVariation._id));
        } else if (e.target.checked) {
            dispatch(addItems(productVariation));
        }
    };
    const onChangeTargetAll = (type: 'REMOVE' | 'ADD') => {
        switch (type) {
            case 'ADD':
                return dispatch(setItemsCart(findItemsActive!));
            case 'REMOVE':
                return dispatch(removeAll());

            default:
                return null;
        }
    };
    const handleNavigateCheckout = () => {
        if (cartItem.length !== 0) {
            navigate(MAIN_ROUTES.SHIPPING);
        }
    };
    const confirm: PopconfirmProps['onConfirm'] = (id: any) => {
        handleRemoveCart(id);
        dispatch(removeItems(id));
        message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };
    const handleRemoveAllItem = () => {
        removeAllItems();
    };
    const columns: TableProps<ICartItemsResponse>['columns'] = [
        {
            key: '',
            dataIndex: '',
            title: 'Chọn',
            render: (_, record) => {
                const isChecked = cartItem.some((item) => item._id === record._id);
                return (
                    <Checkbox
                        onChange={(e) => onchangeItemsChecked(e, record)}
                        disabled={record.stock === 0}
                        checked={isChecked}
                    />
                );
            },
        },
        {
            key: 'product',
            dataIndex: 'product',
            title: 'Sản phẩm',
            render: (_, product) => (
                <div>
                    <div className='flex gap-2'>
                        <div>
                            <Image className='max-h-[80px] max-w-[80px]' src={product.image} />
                        </div>
                        <div>
                            {product.stock !== 0 ? (
                                <div className='flex flex-wrap'>
                                    <Link
                                        className='text-global! hover:text-hover! text-base font-semibold'
                                        to={`${MAIN_ROUTES.PRODUCTS}/${product.productId}`}
                                    >
                                        {product.name}
                                    </Link>
                                </div>
                            ) : (
                                <div className='flex h-full items-center justify-center'>
                                    <h3 className='ml-4 font-medium'>Sản Phẩm Hiện không Khả Dụng</h3>
                                </div>
                            )}
                            {product.stock !== 0 && (
                                <div className='flex flex-col'>
                                    <div className='flex gap-2'>
                                        <span className='font-medium text-black capitalize'>Màu sắc:</span>
                                        <span>{product.color}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-medium text-black capitalize'>Kích cỡ:</span>
                                        <span>{product.size}</span>
                                    </div>
                                    <span className={clsx('text-base leading-5 font-semibold text-[#222]')}>
                                        {Currency.format(product.price)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ),
            width: '50%',
        },
        {
            key: 'stock',
            dataIndex: 'stock',
            title: <span className='flex items-center justify-center'>Số lượng</span>,
            render: (_, product) => {
                const quantity = quantityProduct?.find((p) => p.id === product._id)?.quantity || 0;
                return (
                    <div className='flex items-center justify-center'>
                        <Button
                            type='default'
                            disabled={quantity < 2}
                            icon={<MinusOutlined className='transform transition duration-500 hover:rotate-180' />}
                            onClick={() => handleDecreaseQuantity(product.productId, product.variantId)}
                        />
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgContainerDisabled: 'white',
                                    colorTextDisabled: 'black',
                                },
                            }}
                        >
                            <div className='flex items-center justify-center'>
                                <InputNumber
                                    min={1}
                                    controls={false}
                                    value={quantity}
                                    max={product.stock}
                                    onPressEnter={(e: any) => {
                                        if (quantity && +e.target.value > product.stock) {
                                            toast('info', `Số lượng tối đa là ${product.stock}`);
                                        }
                                    }}
                                    onBlur={(e: any) => {
                                        if (quantity && +e.target.value > product.stock) {
                                            toast('info', `Số lượng tối đa là ${product.stock}`);
                                        }
                                    }}
                                    onChange={(e) =>
                                        handleChangeQuantity(product.productId, product.variantId, e as number)
                                    }
                                />
                            </div>
                        </ConfigProvider>
                        <Button
                            type='default'
                            disabled={quantity === product.stock}
                            icon={<PlusOutlined className='transform transition duration-500 hover:rotate-180' />}
                            onClick={() => handleIncreaseQuantity(product.productId, product.variantId)}
                        />
                    </div>
                );
            },
        },
        {
            key: 'subTotal',
            dataIndex: 'subTotal',
            title: 'Tổng tiền',
            render: (_, product) => <span>{Currency.format(product.price * product.quantity)}</span>,
        },
        {
            key: 'action',
            dataIndex: 'action',
            title: '',
            render: (_, product) => (
                <Popconfirm
                    title='Thông báo'
                    description='Bạn có chắc là muốn xóa sản phẩm này khỏi giỏ hàng?'
                    onConfirm={() => confirm(product._id as any)}
                    placement='leftTop'
                    okText='Đồng ý'
                    cancelText='Hủy'
                >
                    <Button loading={isPending} type='text' className='text-indigo-600 hover:text-indigo-500'>
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <div className='max-w-screen-default mx-4 my-16 bg-white py-8 default:mx-auto'>
                <h1 className='my-4 text-3xl font-medium text-black'>Giỏ hàng</h1>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-[2.4fr,1fr]'>
                    <Form>
                        <div>
                            <Table
                                loading={isLoading}
                                rowKey={(product) => product._id}
                                columns={columns}
                                dataSource={products?.items}
                                pagination={false}
                            />
                            <div className='my-6 flex items-center justify-between'>
                                <div className='flex gap-2'>
                                    <Link
                                        to='/'
                                        className='bg-global block rounded-sm px-6 py-[0.62rem] text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                    >
                                        Tiếp tục mua hàng
                                    </Link>
                                    <Button
                                        size='large'
                                        onClick={() => onChangeTargetAll('ADD')}
                                        className='bg-global block rounded-sm px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                    >
                                        Chọn Tất Cả Sản Phẩm
                                    </Button>
                                    {cartItem.length > 0 && (
                                        <Button
                                            size='large'
                                            onClick={() => onChangeTargetAll('REMOVE')}
                                            className='bg-global block rounded-sm px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                        >
                                            Bỏ Chọn Tất Cả Sản Phẩm
                                        </Button>
                                    )}
                                </div>
                                {products && products.items.length !== 0 && (
                                    <Button
                                        onClick={() => handleRemoveAllItem()}
                                        size='large'
                                        className='bg-global block rounded-sm px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                    >
                                        Xóa tất cả sản phẩm
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Form>

                    <div className='border-hover border-[1px] px-8 pt-6 pb-6 text-base text-black'>
                        {cartItem.length > 0 ? (
                            <>
                                <div className='border-gray mt-4 flex items-center justify-between border-b pb-6 text-base font-semibold'>
                                    <span>Sản phẩm được chọn:</span>
                                    <span>{cartItem?.length}</span>
                                </div>

                                <div className='border-gray flex items-center justify-between border-b pb-6 text-base font-semibold'>
                                    <span>Tổng tiền:</span>
                                    <span className='text-lg text-green-500'>{Currency.format(totalOrderAmount)}</span>
                                </div>
                                <p className='my-4 opacity-90'>Phí vận chuyển sẽ được tính khi thanh toán.</p>
                            </>
                        ) : (
                            <div className='flex min-h-[160px] items-center justify-center'>
                                <h3 className='font-bold'>Vui Lòng Chọn Sản Phẩm Để Thanh Toán</h3>
                            </div>
                        )}

                        <div className='mt-12'>
                            <button
                                disabled={cartItem.length === 0}
                                onClick={() => handleNavigateCheckout()}
                                className={`bg-global hover:bg-hover disabled:hover:bg-global block h-[48px] w-full rounded-[5px] px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear`}
                            >
                                Thanh Toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
