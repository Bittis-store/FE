import { Breadcrumb, Button, Collapse, ConfigProvider, Divider, Flex, Image, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ShopBenefits from '~/components/ShopBenefits';
import { Currency } from '~/utils/FormatCurreny';
import showMessage from '~/utils/ShowMessage';
import SizeGuideModal from './SizeGuideModal';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CarouselDisplay, { CarouselItem } from '~/components/CarouselDisplay';
import DefaultCard from '~/components/ProductCard/DefaultCard';
import { useGetDetailProduct } from '~/hooks/Products/Queries/useGetDetailProduct';
import { useTypedSelector } from '~/store/store';
import { useMutationAddToCart } from '~/hooks/cart/Mutations/useAddCart';
import { useGetRelatedProduct } from '~/hooks/Products/Queries/useGetRelatedProduct';
import ProductReviews from './ProductReviews';

interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data } = useGetDetailProduct(id ? id : '');
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
    // Mount State khi trang được khởi tạo để set mặc định variant đầu tiên
    const navigate = useNavigate();
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const { data: relatedProduct } = useGetRelatedProduct(id ? id : '');

    const handleChooseSize = (item: any) => {
        setValueQuantity(1);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let selectedColor = item.colors[0];
        if (selectedColor.stock === 0) {
            const availableColor = item.colors.find((color: any) => color.stock > 0);
            if (availableColor) {
                selectedColor = availableColor;
            } else {
                selectedColor = item.colors[1] || item.colors[0];
                alert('Tất cả các màu đều hết hàng.');
            }
        }
        setSelectedColor(selectedColor);
        setSelectedImage({
            index: 0,
            image: selectedColor.image,
        });
        setSelectedSize(item);
    };

    const handleChooseColor = (item: any) => {
        setValueQuantity(1);
        setSelectedColor({
            _id: item._id,
            color: item.color,
            stock: item.stock,
        });
        setSelectedImage({
            index: 0,
            image: item.image,
        });
    };
    const hasAvailableStock = variantsList?.some((variant) => variant.colors.some((color) => color.stock > 0));

    const { mutate } = useMutationAddToCart();
    const handleIncrement = () => {
        if (valueQuantity < (selectedColor?.stock ? selectedColor.stock : 0)) setValueQuantity(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setValueQuantity(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setValueQuantity(e ? e : 1);
    };
    const handleAddToCart = () => {
        if (isAuth) {
            if (selectedColor) {
                mutate({
                    productId: id,
                    quantity: valueQuantity,
                    variantId: selectedColor._id,
                });
            } else {
                showMessage('Bạn chưa chọn biến thể sản phẩm!', 'warning');
            }
        } else {
            navigate('/login');
            showMessage('Bạn cần đăng nhập trước khi mua hàng!', 'warning', 2000);
        }
    };

    const imageUrlsSet = new Set(data?.variants.map((item) => item.image));
    const map: { [key: string]: number } = {};
    const url = Array.from(imageUrlsSet);
    const uniqueImage = [];

    for (let i = 0; i < url.length; i++) {
        const key = url[i].split('_____')[1];
        if (!map[key]) {
            map[key] = 1;
            uniqueImage.push(url[i]);
        }
    }

    useEffect(() => {
        if (data) {
            setSelectedImage({
                index: 0,
                image: data.variants[0].image,
            });
            const transformedVariants: TransformedVariant[] = data.variants.reduce((acc, variant) => {
                let sizeIndex = acc.findIndex((item) => item.size._id === variant.size._id);
                if (sizeIndex === -1) {
                    acc.push({
                        size: variant.size,
                        colors: [
                            {
                                color: variant.color,
                                stock: variant.stock,
                                image: variant.image,
                                _id: variant._id,
                            },
                        ],
                    });
                } else {
                    acc[sizeIndex].colors.push({
                        color: variant.color,
                        stock: variant.stock,
                        image: variant.image,
                        _id: variant._id,
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
    }, [data]);

    return (
        <>
            {data && (
                <div className='max-w-screen-default mx-4 default:mx-auto'>
                    {/* BREADCRUMB */}
                    <div className='breadcrumb'>
                        <Breadcrumb
                            className='py-4 text-base'
                            separator='>'
                            items={[
                                {
                                    title: <Link to={'/'}>Trang chủ</Link>,
                                },
                                {
                                    title: <Link to={`/products/?category=${data?.category}`}>Sản phẩm</Link>,
                                },
                                {
                                    title: <p>{data?.name}</p>,
                                },
                            ]}
                        />
                    </div>

                    {/* MAIN CONTENT */}
                    <div className='my-4 flex justify-around'>
                        {/* GALLERY */}
                        <div className='flex gap-3'>
                            <div className='w-4/5 overflow-hidden rounded-md'>
                                <Image className='w-full' height={600} src={selectedImage.image} />
                            </div>

                            <div className='flex flex-col items-center gap-2'>
                                {uniqueImage?.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setSelectedImage({
                                                index,
                                                image: image,
                                            })
                                        }
                                        className={`${
                                            index === selectedImage.index ? 'border-global border-[1px]' : 'border-none'
                                        } w-24 cursor-pointer overflow-hidden rounded-md`}
                                    >
                                        <img className='object-cover' src={image} alt='' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className='w-2/5'>
                            <Flex vertical>
                                {/* NAME AND FAVOURITE BUTTON */}
                                <div className='my-1 flex w-full items-center justify-between'>
                                    {/* PRODUCT NAME */}
                                    <div className='text-global w-4/5 text-2xl font-semibold uppercase'>
                                        {data.name}
                                    </div>

                                    {/* FAVORITE BUTTON */}
                                    <div className='w-1/5 text-center'>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Button: {
                                                        defaultHoverColor: '#da291c',
                                                        defaultHoverBorderColor: '#da291c',
                                                    },
                                                },
                                            }}
                                        ></ConfigProvider>
                                    </div>
                                </div>

                                {/* PRICE */}
                                <div className='text-global my-2 text-xl font-bold'>{Currency(data.price)}</div>
                                {hasAvailableStock ? (
                                    <>
                                        <div className='my-2'>
                                            <div>
                                                <span className='text-global'>Kích cỡ</span>:{' '}
                                                <span className='text-global font-semibold'>
                                                    {selectedSize?.size.name}
                                                </span>
                                            </div>

                                            <Flex className='my-2'>
                                                {variantsList?.map((item, index) => {
                                                    const hasStock = item.colors.some((color: any) => color.stock > 0);

                                                    return (
                                                        <button
                                                            key={index}
                                                            className={`relative mt-1 mr-1 ${!hasStock ? 'border-[#d3d3d3] text-[#777777]' : ''} h-10 w-10 rounded-sm text-xs ${selectedSize?.size.name === item.size.name ? 'bg-orange-600 font-semibold text-white' : 'border-[1px]'}`}
                                                            onClick={() => handleChooseSize(item)}
                                                            disabled={!hasStock}
                                                        >
                                                            {item.size.name}
                                                            {!hasStock && (
                                                                <div className='absolute top-[50%] left-[50%] h-[2px] w-13 -translate-x-[50%] -translate-y-[50%] rotate-45 bg-[#d3d3d3]'></div>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </Flex>
                                        </div>

                                        <div className='my-2'>
                                            <div className='mb-2'>
                                                <span className='text-global'>Màu sắc</span>:{' '}
                                                <span className='text-global font-semibold'>
                                                    {selectedColor?.color.name}
                                                </span>
                                            </div>

                                            <Flex className='my-3'>
                                                {selectedSize?.colors.map((item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() =>
                                                                item.stock === 0 ? null : handleChooseColor(item)
                                                            }
                                                            className={`w-10 ${item.stock === 0 ? 'bg-opacity-60 border-opacity-60 cursor-not-allowed' : 'cursor-pointer'} relative mr-2 flex h-10 items-center justify-center rounded-sm border-[1px] bg-[#f5f5f5] ${selectedColor?._id === item._id ? `border-black` : 'border-[#eee9e9]'}`}
                                                        >
                                                            <div
                                                                className={`rounded-full border-[1px] p-0.5 ${selectedColor?._id === item._id ? 'border-global' : 'border-[#d3d3d3]'}`}
                                                            >
                                                                <div
                                                                    className={`h-5 w-5 rounded-full ${item.stock === 0 && 'opacity-55'}`}
                                                                    style={{
                                                                        backgroundColor: `${item.color.hex}`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            {item.stock === 0 && (
                                                                <div className='absolute top-[50%] left-[50%] h-[1px] w-10 -translate-x-[50%] -translate-y-[50%] rotate-45 bg-[#777777]'></div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </Flex>
                                            <span className='text-global mt-3 inline-block text-xs'>
                                                Trong kho: {selectedColor?.stock} Sản phẩm
                                            </span>
                                        </div>
                                        {selectedColor && (
                                            <div className='mb-[15px] flex w-[100%] items-center gap-[5px] md:mb-0 lg:w-[28%]'>
                                                <Button
                                                    onClick={handleDecrement}
                                                    disabled={valueQuantity < 2}
                                                    className='h-[48px] w-[48px]'
                                                >
                                                    -
                                                </Button>
                                                <div className='flex w-[500px] items-center justify-center'>
                                                    <InputNumber
                                                        onChange={onChangeInputQuantity}
                                                        min={1}
                                                        max={selectedColor.stock}
                                                        value={valueQuantity}
                                                        controls={false}
                                                        onPressEnter={(e: any) => {
                                                            if (e.target.value > selectedColor.stock) {
                                                                showMessage(
                                                                    `Số lượng tối đa là ${selectedColor.stock}`,
                                                                    'info'
                                                                );
                                                            }
                                                        }}
                                                        onBlur={(e: any) => {
                                                            if (e.target.value > selectedColor.stock) {
                                                                showMessage(
                                                                    `Số lượng tối đa là ${selectedColor.stock}`,
                                                                    'info'
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={handleIncrement}
                                                    disabled={valueQuantity === selectedColor.stock}
                                                    className='h-[48px] w-[48px]'
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className='flex min-h-[20vh] items-center justify-center'>
                                        <span className='text-hover text-base font-bold uppercase'>
                                            Sản phẩm hết hàng
                                        </span>
                                    </div>
                                )}

                                {/* ADD TO CART */}
                                <Flex gap={15}>
                                    <div className='mt-4 w-3/5'>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Button: {
                                                        defaultHoverBorderColor: '#FFFFFF',
                                                        defaultHoverBg: 'oklch(0.646 0.222 41.116)',
                                                        defaultHoverColor: '#fff',
                                                    },
                                                },
                                            }}
                                        >
                                            <Button
                                                onClick={() => handleAddToCart()}
                                                disabled={!variantsList || !selectedSize}
                                                block
                                                icon={<ShoppingCartOutlined className='text-2xl' />}
                                                className='text-primary border-[#da291c] bg-orange-600 bg-white py-7 text-lg font-bold'
                                            >
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </ConfigProvider>
                                    </div>

                                    <div className='w-2/5'>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Button: {
                                                        defaultHoverBorderColor: '#FFFFFF',
                                                        defaultHoverBg: '#da291c',
                                                        defaultHoverColor: '#FFFFFF',
                                                    },
                                                },
                                            }}
                                        ></ConfigProvider>
                                    </div>
                                </Flex>

                                {/* MORE INFORMATIONS */}
                                <div>
                                    <Divider className='my-4' />

                                    <Collapse
                                        expandIconPosition='end'
                                        bordered={false}
                                        ghost
                                        items={[
                                            {
                                                key: 'Mô tả',
                                                label: <span className='text-base font-bold'>Mô tả</span>,
                                                children: <p>{data?.description}</p>,
                                            },
                                        ]}
                                    />

                                    <SizeGuideModal />

                                    <Divider className='my-4' />
                                </div>
                            </Flex>
                        </div>
                    </div>
                    <div>
                        <ProductReviews />
                    </div>
                    <div className='my-14'>
                        <ShopBenefits />
                    </div>
                    {/* RELATED PRODUCTS */}
                    <div className='text-global mt-5 text-xl font-bold'>Gợi ý mua cùng</div>
                    <CarouselDisplay className='mt-4'>
                        {relatedProduct &&
                            relatedProduct.map((item, index: number) => {
                                return (
                                    <CarouselItem key={index}>
                                        <DefaultCard item={item} />
                                    </CarouselItem>
                                );
                            })}
                    </CarouselDisplay>
                </div>
            )}
        </>
    );
};

export default ProductDetailsPage;
