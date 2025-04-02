import { CloseOutlined, FrownTwoTone } from '@ant-design/icons';
import { Button, Card, Flex, Image, Rate, Space, Tooltip } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useFilter from '~/hooks/_common/useFilter';
import { useMutationAddToCart } from '~/hooks/cart/Mutations/useAddCart';
import { useMutationRemoveWishList } from '~/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState } from '~/store/store';
import { Currency } from '~/utils';
import showMessage from '~/utils/ShowMessage';

interface IPickerData {
    _id: string;
}

const Wishlist = () => {
    useDocumentTitle('Danh sách yêu thích');
    const { query } = useFilter();
    const [valueQuantity, setQuantityValue] = useState(1);
    const { data: wishList } = useGetAllWishlist(query);
    const { handleRemoveWishList, isPending } = useMutationRemoveWishList();
    const wishListProduct = wishList?.data?.wishList;
    console.log(wishListProduct);

    const navigate = useNavigate();
    const { mutate } = useMutationAddToCart();
    const user = useSelector((state: RootState) => state.auth.user);
    const debouncedRemove = debounce((id: string) => handleRemoveWishList(id), 500);
    const handleOnSubmit = (data: IPickerData) => {
        if (user) {
            const bodyAddToCart = {
                productVariation: data._id,
                userId: user._id,
                quantity: valueQuantity,
            };
            mutate(bodyAddToCart);
            setQuantityValue(1);
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };
    return (
        <div className='max-w-screen-default mx-4 default:mx-auto'>
            <WrapperList classic title='Danh sách sản phẩm yêu thích' className='mt-12'>
                {!wishList?.data.wishList.length && (
                    <Flex vertical={true}>
                        <Card className='w-full rounded-lg'>
                            <Space className='flex flex-col'>
                                <div className='text-lg font-semibold'>
                                    <Space>
                                        Danh sách của bạn hiện không có sản phẩm nào <FrownTwoTone />
                                    </Space>
                                </div>

                                <div className='text-base'>
                                    Nhấn vào nút trái tim để thêm sản phẩm vào danh sách yêu thích.
                                </div>
                            </Space>
                        </Card>
                    </Flex>
                )}

                {wishList && (
                    <div className='container mx-auto px-4 py-6'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                            {wishListProduct &&
                                wishListProduct.map((item: any) => (
                                    <Card
                                        key={item._id}
                                        className='rounded-lg transition-all duration-300 hover:shadow-md'
                                        bodyStyle={{ padding: '16px' }}
                                    >
                                        <div className='flex gap-4'>
                                            <div className='relative w-[140px]'>
                                                <Image
                                                    className='h-[140px] w-full rounded-lg object-cover'
                                                    src={item.variants[0].image}
                                                    alt={item.name}
                                                />
                                                {item.discount > 0 && (
                                                    <div className='absolute top-2 left-2 rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white'>
                                                        -{item.discount}%
                                                    </div>
                                                )}
                                            </div>

                                            <div className='flex min-w-0 flex-1 flex-col'>
                                                <div className='flex items-start justify-between gap-2'>
                                                    <h3 className='truncate text-base font-medium text-gray-800'>
                                                        {item.name}
                                                    </h3>
                                                    <Tooltip title='Xóa khỏi danh sách yêu thích'>
                                                        <Button
                                                            type='text'
                                                            size='small'
                                                            loading={isPending}
                                                            className='flex-shrink-0 hover:text-red-500'
                                                            onClick={() => debouncedRemove(item._id)}
                                                            icon={<CloseOutlined />}
                                                        />
                                                    </Tooltip>
                                                </div>

                                                <div className='mt-1'>
                                                    <Rate
                                                        allowHalf
                                                        disabled
                                                        value={item.rating || 5}
                                                        className='text-xs'
                                                    />
                                                    <span className='ml-2 text-xs text-gray-500'>
                                                        ({item.reviewCount || 0})
                                                    </span>
                                                </div>

                                                <div className='mt-2 text-sm'>
                                                    {item.variants[0].stock > 0 ? (
                                                        <span className='text-emerald-500'>Còn hàng</span>
                                                    ) : (
                                                        <span className='text-red-500'>Hết hàng</span>
                                                    )}
                                                </div>

                                                <div className='mt-2 flex gap-2'>
                                                    {item.variants.slice(0, 4).map((variant: any, i: number) => (
                                                        <Tooltip key={i} title={variant.color.name}>
                                                            <div
                                                                className='h-6 w-6 rounded-full border-2 border-gray-200'
                                                                style={{
                                                                    backgroundColor: variant.color.hex,
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                    {item.variants.length > 4 && (
                                                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500'>
                                                            +{item.variants.length - 4}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className='mt-auto flex items-center justify-between pt-3'>
                                                    <div>
                                                        <div className='text-base font-semibold text-gray-800'>
                                                            {Currency.format(item.price || 0)}
                                                        </div>
                                                        {item.discount > 0 && (
                                                            <div className='text-sm text-gray-400 line-through'>
                                                                {Currency.format(item.discount)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button
                                                        type='link'
                                                        className='p-0 text-blue-500 hover:text-blue-600'
                                                        onClick={() => navigate(`/products/${item._id}`)}
                                                    >
                                                        Xem chi tiết
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                        </div>
                    </div>
                )}
            </WrapperList>
        </div>
    );
};

export default Wishlist;
