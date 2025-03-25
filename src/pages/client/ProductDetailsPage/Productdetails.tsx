import { Breadcrumb, Button, Collapse, ConfigProvider, Divider, Flex, Image, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShopBenefits from '~/components/ShopBenefits';
import { IProduct } from '~/types/Product';
import { Currency } from '~/utils/FormatCurreny';
import showMessage from '~/utils/ShowMessage';
import SizeGuideModal from './SizeGuideModal';

interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
const ProductDetailsPage = () => {
    const { id } = useParams();
    // const { data } = useGetDetailProduct(id ? id : '');
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

    // Fake tạm data
    const data: IProduct = {
        _id: '1',
        name: 'Áo thun nam basic',
        isActive: true,
        category: { name: 'Áo thun', _id: 'cate-1' },
        discount: 10,
        price: 200000,
        variants: [
            {
                _id: 'var-1',
                color: { _id: 'color-1', hex: '#ff0000', name: 'Đỏ' },
                size: { _id: 'size-1', name: 'M' },
                stock: 50,
                image: 'https://picsum.photos/300/400?random=1',
                imageUrlRef: 'https://picsum.photos/600/800?random=1',
            },
            {
                _id: 'var-2',
                color: { _id: 'color-2', hex: '#0000ff', name: 'Xanh' },
                size: { _id: 'size-1', name: 'L' },
                stock: 30,
                image: 'https://picsum.photos/300/400?random=2',
                imageUrlRef: 'https://picsum.photos/600/800?random=2',
            },
            {
                _id: 'var-3',
                color: { _id: 'color-3', hex: '#00ff00', name: 'Xanh lá' },
                size: { _id: 'size-1', name: 'XL' },
                stock: 40,
                image: 'https://picsum.photos/300/400?random=3',
                imageUrlRef: 'https://picsum.photos/600/800?random=3',
            },
            {
                _id: 'var-4',
                color: { _id: 'color-4', hex: '#ff00ff', name: 'Hồng' },
                size: { _id: 'size-1', name: 'S' },
                stock: 25,
                image: 'https://picsum.photos/300/400?random=4',
                imageUrlRef: 'https://picsum.photos/600/800?random=4',
            },
        ],
        description: 'Áo thun nam chất liệu cotton thoáng mát, phù hợp mặc hàng ngày.',
        sold: 100,
        tags: ['thoáng mát', 'thời trang', 'nam'],
        createdAt: '2024-03-01T12:00:00Z',
        updatedAt: '2024-03-05T14:00:00Z',
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
    const handleIncrement = () => {
        if (valueQuantity < (selectedColor?.stock ? selectedColor.stock : 0)) setValueQuantity(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setValueQuantity(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setValueQuantity(e ? e : 1);
    };

    const imageUrlsSet = new Set(data?.variants.map((item) => item.image));
    const map: { [key: string]: number } = {};
    const url = Array.from(imageUrlsSet);
    const uniqueImage = [];

    for (let i = 0; i < url.length; i++) {
        // '_____'
        const key = url[i].split('=')[1];
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
    }, []);

    return (
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
                            <div className='text-global w-4/5 text-2xl font-semibold uppercase'>{data?.name}</div>

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
                        <div className='text-global my-2 text-xl font-bold'>{Currency(data?.price as number)}</div>
                        {hasAvailableStock ? (
                            <>
                                <div className='my-2'>
                                    <div>
                                        <span className='text-global'>Kích cỡ</span>:{' '}
                                        <span className='text-global font-semibold'>{selectedSize?.size.name}</span>
                                    </div>
                                </div>

                                <div className='my-2'>
                                    <div>
                                        <span className='text-global'>Màu sắc</span>:{' '}
                                        <span className='text-global font-semibold'>{selectedColor?.color.name}</span>
                                    </div>

                                    <Flex className='my-2'>
                                        {selectedSize?.colors.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => (item.stock === 0 ? null : handleChooseColor(item))}
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
                                    <span className='text-global text-xs'>
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
                                        <InputNumber
                                            onChange={onChangeInputQuantity}
                                            onError={(e) => console.log(e)}
                                            min={1}
                                            max={selectedColor.stock}
                                            className='flex h-[48px] w-[58px] items-center'
                                            value={valueQuantity}
                                            controls={false}
                                            onPressEnter={(e: any) => {
                                                if (e.target.value > selectedColor.stock) {
                                                    showMessage(`Số lượng tối đa là ${selectedColor.stock}`, 'info');
                                                }
                                            }}
                                            onBlur={(e: any) => {
                                                if (e.target.value > selectedColor.stock) {
                                                    showMessage(`Số lượng tối đa là ${selectedColor.stock}`, 'info');
                                                }
                                            }}
                                        />
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
                                <span className='text-hover text-base font-bold uppercase'>Sản phẩm hết hàng</span>
                            </div>
                        )}

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

            <div className='my-10'>
                <ShopBenefits />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
