import CarouselDisplay, { CarouselItem } from '~/components/CarouselDisplay';
import DefaultCard from '~/components/ProductCard/DefaultCard';
import { IProduct } from '~/types/Product';

type Props = {
    isLoading: boolean;
    products: IProduct[];
    title: string;
};

const WrapperList = ({ isLoading, products, title }: Props) => {
    return (
        <div className='max-w-screen-default mx-4 my-4 default:mx-auto'>
            <div className='2xl:max-w-screen-default mt-4 w-full default:mx-auto lg:max-w-[1200px]'>
                <h3 className='text-global text-xl font-bold'>{title}</h3>
                <CarouselDisplay className='mt-4'>
                    {!isLoading &&
                        products?.map((item, index: number) => {
                            return (
                                <CarouselItem key={index}>
                                    <DefaultCard item={item} />
                                </CarouselItem>
                            );
                        })}
                </CarouselDisplay>
            </div>
        </div>
    );
};

export default WrapperList;