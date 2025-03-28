import { Link } from 'react-router-dom';
import bannerOne from '~/assets/img/banner-phụ_2m-600x320.jpg';
import bannerTwo from '~/assets/img/Frontpage_img-background-Sale-off.jpg';
import Banner from '~/components/Banner';
import ShowMoreList from '~/components/ShowMoreList';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import useWindowSize from '~/hooks/_common/useWindowSize';
import { useGetAllProducts } from '~/hooks/Products/Queries/useGetAllProducts';
import { useGetProductBest } from '~/hooks/Products/Queries/useGetProductBest';
import { useGetProductDiscount } from '~/hooks/Products/Queries/useGetProductDiscount';
import { IProduct } from '~/types/Product';
import CarouselDisplay, { CarouselItem } from '~/components/CarouselDisplay';
import DefaultCard from '~/components/ProductCard/DefaultCard';

export default function Homepage() {
    // const { data: productBest, isLoading: bestLoading } = useGetProductBest();
    // const { data: productDiscount, isLoading: discountLoading } = useGetProductDiscount();
    const { data: allProducts, isLoading: allProductLoading } = useGetAllProducts({});

    const { windowWidth } = useWindowSize();

    const products: IProduct[] = [
        {
            _id: '1',
            name: 'Product 1',
            isActive: true,
            category: { name: 'Category 1', _id: 'cat1' },
            discount: 10,
            price: 500,
            variants: [
                {
                    _id: 'v1',
                    color: { _id: 'c1', hex: '#FF5733', name: 'Red' },
                    size: { _id: 's1', name: 'M' },
                    stock: 20,
                    image: 'https://picsum.photos/200/300?random=1',
                    imageUrlRef: 'https://picsum.photos/200/300?random=1',
                },
            ],
            description: 'Description for product 1',
            sold: 100,
            tags: ['tag1', 'tag2'],
            createdAt: '2025-03-05T14:30:00Z',
            updatedAt: '2025-03-05T15:00:00Z',
        },
        {
            _id: '2',
            name: 'Product 2',
            isActive: false,
            category: 'Category 2',
            discount: 15,
            price: 300,
            variants: [
                {
                    _id: 'v2',
                    color: { _id: 'c2', hex: '#33FF57', name: 'Green' },
                    size: { _id: 's2', name: 'L' },
                    stock: 15,
                    image: 'https://picsum.photos/200/300?random=2',
                    imageUrlRef: 'https://picsum.photos/200/300?random=2',
                },
            ],
            description: 'Description for product 2',
            sold: 50,
            tags: ['tag3', 'tag4'],
            createdAt: '2025-02-15T10:00:00Z',
            updatedAt: '2025-02-20T11:00:00Z',
        },
        {
            _id: '3',
            name: 'Product 3',
            isActive: true,
            category: { name: 'Category 3', _id: 'cat3' },
            discount: 5,
            price: 700,
            variants: [
                {
                    _id: 'v3',
                    color: { _id: 'c3', hex: '#5733FF', name: 'Blue' },
                    size: { _id: 's3', name: 'S' },
                    stock: 10,
                    image: 'https://picsum.photos/200/300?random=3',
                    imageUrlRef: 'https://picsum.photos/200/300?random=3',
                },
            ],
            description: 'Description for product 3',
            sold: 200,
            tags: ['tag5', 'tag6'],
            createdAt: '2025-01-10T08:30:00Z',
            updatedAt: '2025-01-12T09:00:00Z',
        },
        {
            _id: '4',
            name: 'Product 4',
            isActive: true,
            category: 'Category 4',
            discount: 20,
            price: 400,
            variants: [
                {
                    _id: 'v4',
                    color: { _id: 'c4', hex: '#FFD700', name: 'Gold' },
                    size: { _id: 's4', name: 'XL' },
                    stock: 8,
                    image: 'https://picsum.photos/200/300?random=4',
                    imageUrlRef: 'https://picsum.photos/200/300?random=4',
                },
            ],
            description: 'Description for product 4',
            sold: 75,
            tags: ['tag7', 'tag8'],
            createdAt: '2025-03-01T13:30:00Z',
            updatedAt: '2025-03-03T14:00:00Z',
        },
        {
            _id: '5',
            name: 'Product 5',
            isActive: false,
            category: { name: 'Category 5', _id: 'cat5' },
            discount: 30,
            price: 600,
            variants: [
                {
                    _id: 'v5',
                    color: { _id: 'c5', hex: '#000000', name: 'Black' },
                    size: { _id: 's5', name: 'L' },
                    stock: 5,
                    image: 'https://picsum.photos/200/300?random=5',
                    imageUrlRef: 'https://picsum.photos/200/300?random=5',
                },
            ],
            description: 'Description for product 5',
            sold: 120,
            tags: ['tag9', 'tag10'],
            createdAt: '2025-02-20T15:30:00Z',
            updatedAt: '2025-02-22T16:00:00Z',
        },
    ];

    return (
        <>
            <Banner />
            <div className='mt-2 py-6 pb-10'>
                <div className='max-w-screen-default mx-7'>
                    <div className=''>
                        <div className='flex justify-between gap-10'>
                            <div className='w-[50%]'>
                                <Link to='/' className='block h-[320px]'>
                                    <img src={bannerOne} alt='' className='block h-full w-full object-cover' />
                                </Link>
                                <Link
                                    to='/'
                                    className='mt-7 block text-[1.688rem] font-bold uppercase duration-300 hover:text-orange-500'
                                >
                                    black & black
                                </Link>
                                <p className='mt-2'>
                                    Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí
                                    không nhàm chán
                                </p>
                            </div>
                            <div className='w-[50%]'>
                                <Link to='/' className='block h-[320px]'>
                                    <img src={bannerTwo} alt='' className='block h-full w-full object-cover' />
                                </Link>
                                <Link
                                    to='/'
                                    className='mt-7 block text-[1.688rem] font-bold uppercase duration-300 hover:text-orange-500'
                                >
                                    OUTLET SALE
                                </Link>
                                <p className='mt-2'>
                                    Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online
                                    Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể
                                    size, bể số.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WrapperList title='Sản phẩm nổi bật'>
                <div className='max-w-screen-default mx-4 my-4'>
                    <div className='2xl:max-w-screen-default mt-4 w-full'>
                        <CarouselDisplay className='mt-4'>
                            {products?.map((item, index: number) => {
                                return (
                                    <CarouselItem key={index}>
                                        <DefaultCard item={item} />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselDisplay>
                    </div>
                </div>
            </WrapperList>

            <WrapperList title='Tất cả sản phẩm' className='mt-4'>
                <div className='max-w-screen-default mx-4 mt-4'>
                    <div className='2xl:max-w-screen-default mt-4 w-full'>
                        {!allProductLoading && allProducts && (
                            <ShowMoreList
                                enableButton={{
                                    enable: true,
                                    hrefClick: '/products',
                                    limit: windowWidth < 1650 ? 6 : 8,
                                }}
                                data={allProducts.products}
                            />
                        )}
                    </div>
                </div>
            </WrapperList>
        </>
    );
}
