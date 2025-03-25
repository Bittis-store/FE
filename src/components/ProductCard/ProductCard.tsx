import { HeartFilled } from '@ant-design/icons';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useFilter from '~/hooks/common/useFilter';
import { RootState } from '~/store/store';
import { IProduct } from '~/types/Product';
import { Currency } from '~/utils/FormatCurreny';

function ProductCard({ item }: { item: IProduct }) {
    const navigate = useNavigate();
    const { query } = useFilter();
    const user = useSelector((state: RootState) => state.auth.user);

    const originalPrice = item.discount ? item.price / (1 - item.discount / 100) : item.price;
    return (
        <div className='group w-full cursor-pointer'>
            <div className='relative'>
                <Link to={`/products/${item?._id}`}>
                    <img className='w-full object-cover' src={item.variants?.[0]?.image} alt='' />
                </Link>
                <div className='absolute bottom-0 flex w-full items-center justify-between px-2 py-1 opacity-0 duration-300 group-hover:opacity-100'>
                    <div className='text-primary hover:bg-primary flex h-[32px] w-full items-center justify-center rounded-md bg-white px-2 font-medium shadow-md duration-300 hover:text-white lg:text-sm'>
                        <span className='py-2 text-xs xl:text-sm'> Thêm vào giỏ hàng</span>
                    </div>
                    <button className='hover:bg-opacity-80 h-10 w-1/6 rounded-lg text-white duration-300'>
                        <HeartFilled />
                    </button>
                </div>
            </div>
            <Link to={`/products/${item?._id}`} className='text-primary text-sm'>
                <h3 className='group-hover:text-primary mt-4 w-[90%] overflow-hidden font-semibold text-ellipsis whitespace-nowrap'>
                    {item?.name}
                </h3>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold'>{Currency(item?.price)}</p>
                    {item.discount !== 0 && (
                        <div className='flex items-center gap-2'>
                            <span className='line-through'>{Currency(originalPrice)}</span>
                            <span className='text-hover font-semibold'>{item.discount}%</span>
                        </div>
                    )}
                </div>
                {item.discount !== 0 ? (
                    <div>
                        <div className='mt-2'>
                            <span className='text-primary rounded-sm border-[1px] px-2 py-0.5 text-xs'>
                                Giá độc quyền Online
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col justify-end'>
                        <div className='mt-2'>
                            <span className='text-primary rounded-sm border-[1px] px-2 py-0.5 text-xs'>
                                Hàng chính Hãng
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
}

export default memo(ProductCard);
