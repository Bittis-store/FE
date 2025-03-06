import { HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IProduct } from '~/types/Product';
import { Currency } from '~/utils/FormatCurreny';

export default function DefaultCard({ item }: { item: IProduct }) {
    const originalPrice = item.discount ? item.price / (1 - item.discount / 100) : item.price;

    return (
        <div className='group mb-2 cursor-pointer'>
            <div className='relative w-full'>
                <Link to={`/`}>
                    <img className='w-full' src={item.variants[0].image} alt={item.name} />
                </Link>

                <div className='absolute bottom-0 flex w-full items-center justify-between px-2 py-1 opacity-0 duration-300 group-hover:opacity-100'>
                    <div className='text-global hover:bg-primary flex h-[32px] w-full items-center justify-center rounded-md bg-white px-2 text-sm font-medium shadow-md duration-300 hover:!text-white'>
                        Thêm vào giỏ hàng
                    </div>

                    <button className='hover:bg-opacity-80 h-10 w-1/6 rounded-lg text-white duration-300'>
                        <HeartFilled />
                    </button>
                </div>
            </div>

            <Link to={`/`} className='text-sm text-black'>
                <h3 className='mt-4 w-[90%] overflow-hidden font-semibold text-ellipsis whitespace-nowrap text-black'>
                    {item.name}
                </h3>

                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-black'>{Currency(item?.price)}</p>
                    {item.discount !== 0 && (
                        <div className='flex items-center gap-2'>
                            <span className='text-black/70 line-through'>{Currency(originalPrice)}</span>
                            <span className='font-semibold text-red-500'>{item.discount}%</span>
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
                            <span className='text-hover rounded-sm border-[1px] px-2 py-0.5 text-xs'>
                                Hàng chính Hãng
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
}
