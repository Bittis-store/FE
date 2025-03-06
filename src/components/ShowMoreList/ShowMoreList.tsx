import { IProduct } from '~/types/Product';
import DefaultCard from '../ProductCard/DefaultCard';
import { Link } from 'react-router-dom';

type IPropsShowmoreList = {
    data: IProduct[];
    enableButton?: {
        enable: boolean;
        hrefClick?: string;
        textButton?: string;
        limit?: number;
    };
};

export default function ShowMoreList({
    data,
    enableButton = { enable: true, limit: 8, hrefClick: '' },
}: IPropsShowmoreList) {
    return (
        <div>
            <h3 className='text-global text-xl font-bold'>Tất cả sản phẩm</h3>
            <div className='mt-4 grid grid-cols-1 gap-8 default:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                {enableButton.enable &&
                    data.slice(0, enableButton.limit).map((item, index) => <DefaultCard key={index} item={item} />)}
                {!enableButton.enable && data.map((item, index) => <DefaultCard key={index} item={item} />)}
            </div>
            {enableButton.enable && (
                <div className='mt-8 flex w-full justify-center'>
                    <Link
                        className='hover:bg-primary text-global rounded-md bg-white px-6 py-2 font-semibold shadow-lg duration-300 hover:text-white'
                        to={enableButton.hrefClick ? enableButton.hrefClick : '/'}
                    >
                        {enableButton.textButton || 'Xem thêm'}
                    </Link>
                </div>
            )}
        </div>
    );
}
