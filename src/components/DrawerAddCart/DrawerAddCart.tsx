import { MAIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';
import { useMutationAddToCart } from '~/hooks/cart/Mutations/useAddCart';
import useMutationAddWishList from '~/hooks/wishlist/Mutations/useAddWishList';
import { useMutationRemoveWishList } from '~/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState, useTypedSelector } from '~/store/store';
import { IProduct } from '~/types/Product';
import { Currency } from '~/utils/FormatCurreny';
import showMessage from '~/utils/ShowMessage';
import { cn } from '~/utils/TailwindMerge';
import { CloseOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, InputNumber, Rate, Space, Spin } from 'antd';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
type IPropsDrawerAddCart = {
    children: React.ReactNode;
    classNameBtn?: string;
    item: IProduct;
};
interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
export default function DrawerAddCart({ children, classNameBtn, item }: IPropsDrawerAddCart) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const onClose = () => {
        setOpen(false);
    };
    const showDrawer = () => {
        setOpen(true);
    };
    const [valueQuantity, setValueQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<{
        _id: string;
        color: any;
        stock: number;
    } | null>();
    const [selectedSize, setSelectedSize] = useState<TransformedVariant | null>();
    const [selectedImage, setSelectedImage] = useState<{
        index: number;
        image: string;
    }>({ index: 0, image: '' });
    const [variantsList, setVariantsList] = useState<TransformedVariant[]>();
    useEffect(() => {
        if (item) {
            setSelectedImage({
                index: 0,
                image: item?.variants[0]?.image,
            });
            const transformedVariants: TransformedVariant[] = item.variants.reduce((acc, variant) => {
                let sizeIndex = acc.findIndex((AccItem) => AccItem?.size?._id === variant?.size?._id);
                if (sizeIndex === -1) {
                    acc.push({
                        size: variant?.size,
                        colors: [
                            {
                                color: variant?.color,
                                stock: variant?.stock,
                                image: variant?.image,
                                _id: variant?._id,
                            },
                        ],
                    });
                } else {
                    acc[sizeIndex].colors.push({
                        color: variant?.color,
                        stock: variant?.stock,
                        image: variant?.image,
                        _id: variant?._id,
                    });
                }

                return acc;
            }, [] as TransformedVariant[]);
            setVariantsList(transformedVariants);
            const defaultVariant = transformedVariants.find((variant) => {
                return variant.colors.some((color) => color.stock > 0);
            });
            if (defaultVariant) {
                const defaultColor = defaultVariant.colors.find((color) => color.stock > 0);
                setSelectedSize(defaultVariant);
                setSelectedImage({
                    index: 0,
                    image: defaultColor.image,
                });
                setSelectedColor(defaultColor);
            }
        }
    }, [item]);
    const handleChooseSize = (itemSize: any) => {
        setValueQuantity(1);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let selectedColor = itemSize.colors[0];
        if (selectedColor.stock === 0) {
            const availableColor = itemSize.colors.find((color: any) => color.stock > 0);
            if (availableColor) {
                selectedColor = availableColor;
            } else {
                selectedColor = itemSize.colors[1] || itemSize.colors[0];
                alert('Tất cả các màu đều hết hàng.');
            }
        }
        setSelectedColor(selectedColor);
        setSelectedImage({
            index: 0,
            image: selectedColor.image,
        });
        setSelectedSize(itemSize);
    };

    const handleChooseColor = (itemColor: any) => {
        setValueQuantity(1);
        setSelectedColor({
            _id: itemColor._id,
            color: itemColor.color,
            stock: itemColor.stock,
        });
        setSelectedImage({
            index: 0,
            image: itemColor.image,
        });
    };
    const hasAvailableStock = variantsList?.some((variant) => variant.colors.some((color) => color.stock > 0));
    const { mutate, isPending } = useMutationAddToCart();
    const handleIncrement = () => {
        if (valueQuantity < (selectedColor?.stock ? selectedColor.stock : 0)) setValueQuantity(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setValueQuantity(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setValueQuantity(e ? e : 1);
    };
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        if (isAuth) {
            if (selectedColor) {
                mutate(
                    {
                        productId: item._id,
                        quantity: valueQuantity,
                        variantId: selectedColor._id,
                    },
                    { onSuccess: () => onClose() }
                );
            } else {
                showMessage('Bạn chưa chọn biến thể sản phẩm!', 'warning');
            }
        } else {
            navigate('/login');
            showMessage('Bạn cần đăng nhập trước khi mua hàng!', 'warning', 2000);
        }
    };

    const { query } = useFilter();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className={cn('cursor-pointer whitespace-nowrap', classNameBtn)} onClick={showDrawer}>
                {children}
            </button>
            <Drawer
                title={
                    <>
                        <div className='flex items-center justify-between'>
                            <div className='text-global font-bold uppercase'>Tên sản phẩm</div>
                            <Button type='text' onClick={onClose}>
                                <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                            </Button>
                        </div>
                    </>
                }
                placement='bottom'
                closable={false}
                height={'auto'}
                onClose={onClose}
                open={isOpen}
                // className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                <div className='flex h-full flex-col items-center gap-5 md:flex-row'>
                    <div className='w-[280px]'>
                        <img src={selectedImage.image} alt='' />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex gap-5'>
                            <div>
                                <h3 className='text-global text-lg font-semibold'>{item.name}</h3>
                                <div className='flex items-center gap-2'>
                                    <Rate allowHalf value={5} disabled className='text-base' />
                                    <span className='text-global text-xs'>(5)</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='text-xl font-semibold'>{Currency(item?.price)}</p>
                                {item.discount !== 0 && (
                                    <div className='flex items-center gap-2'>
                                        <span className='text-xl line-through'>
                                            {Currency(
                                                item.discount ? item.price / (1 - item.discount / 100) : item.price
                                            )}
                                        </span>
                                        <span className='text-hover text-xl font-semibold'>{item.discount}%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {hasAvailableStock ? (
                            <>
                                <div className='my-2'>
                                    <div className='mb-1'>
                                        <span className='text-global'>Kích cỡ</span>:{' '}
                                        <span className='text-global font-semibold'>{selectedSize?.size?.name}</span>
                                    </div>

                                    <Flex className='my-2'>
                                        {variantsList?.map((variantItem, index) => {
                                            const hasStock = variantItem?.colors?.some((color: any) => color.stock > 0);

                                            return (
                                                <button
                                                    key={index}
                                                    className={`relative mr-1 ${!hasStock ? 'border-[#d3d3d3] text-[#777777]' : ''} h-10 w-10 rounded-sm text-xs ${selectedSize?.size?.name === variantItem?.size?.name ? 'bg-hover font-semibold text-white' : 'border-[1px]'}`}
                                                    onClick={() => handleChooseSize(variantItem)}
                                                    disabled={!hasStock}
                                                >
                                                    {variantItem?.size?.name}
                                                    {!hasStock && (
                                                        <div className='absolute top-[50%] left-[50%] h-[2px] w-13 -translate-x-[50%] -translate-y-[50%] rotate-45 bg-[#d3d3d3]'></div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </Flex>
                                </div>

                                <div className='my-2'>
                                    <div className='mb-1'>
                                        <span className='text-global'>Màu sắc</span>:{' '}
                                        <span className='text-global font-semibold'>{selectedColor?.color.name}</span>
                                    </div>

                                    <Flex className='my-2'>
                                        {selectedSize?.colors.map((sizeItem, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        sizeItem.stock === 0 ? null : handleChooseColor(sizeItem)
                                                    }
                                                    className={`w-10 ${sizeItem.stock === 0 ? 'bg-opacity-60 border-opacity-60 cursor-not-allowed' : 'cursor-pointer'} sizeItems-center relative mr-2 flex h-10 items-center justify-center rounded-sm border-[1px] bg-[#f5f5f5] ${selectedColor?._id === sizeItem._id ? `border-black` : 'border-[#eee9e9]'}`}
                                                >
                                                    <div
                                                        className={`h-5 w-5 rounded-full border-[1px] p-0.5 ${selectedColor?._id === sizeItem._id ? 'border-global' : 'border-[#d3d3d3]'}`}
                                                    >
                                                        <div
                                                            className={`rounded-full ${sizeItem.stock === 0 && 'opacity-55'}`}
                                                            style={{
                                                                backgroundColor: `${sizeItem.color.hex}`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    {sizeItem.stock === 0 && (
                                                        <div className='absolute top-[50%] left-[50%] h-[1px] w-10 -translate-x-[50%] -translate-y-[50%] rotate-45 bg-[#777777]'></div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </Flex>
                                    <span className='text-global text-xs'>
                                        Trong kho: {selectedColor?.stock} Sản phẩm
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className='flex min-h-[20vh] items-center justify-center'>
                                <span className='text-hover text-base font-bold uppercase'>Sản phẩm hết hàng</span>
                            </div>
                        )}
                        <div className='text-global flex items-center gap-5'>
                            <Space className=''>
                                <Button
                                    disabled={valueQuantity < 2}
                                    onClick={handleDecrement}
                                    className='h-[38px] w-[38px]'
                                >
                                    -
                                </Button>
                                <InputNumber
                                    min={1}
                                    max={selectedColor?.stock}
                                    value={valueQuantity}
                                    controls={false}
                                    onChange={onChangeInputQuantity}
                                    onPressEnter={(e: any) => {
                                        if (selectedColor && e.target.value > selectedColor.stock) {
                                            showMessage(`Số lượng tối đa là ${selectedColor.stock}`, 'info');
                                        }
                                    }}
                                    onBlur={(e: any) => {
                                        if (selectedColor && e.target.value > selectedColor.stock) {
                                            showMessage(`Số lượng tối đa là ${selectedColor.stock}`, 'info');
                                        }
                                    }}
                                />
                                <Button
                                    disabled={valueQuantity === selectedColor?.stock}
                                    onClick={handleIncrement}
                                    className='h-[38px] w-[38px]'
                                >
                                    +
                                </Button>
                            </Space>
                        </div>
                        <div className='mt-4'>
                            <button
                                disabled={isPending}
                                onClick={handleAddToCart}
                                className='text-global hover:border-hover cursor-pointer hover:text-hover border-global border-opacity-55 flex h-[38px] w-[320px] items-center justify-center rounded-md border-[1px] bg-white font-medium shadow-md duration-300'
                            >
                                {isPending ? <Spin size='small'></Spin> : 'Thêm vào giỏ hàng'}
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </motion.div>
    );
}
