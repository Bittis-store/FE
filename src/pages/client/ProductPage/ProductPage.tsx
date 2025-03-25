import FilterSidebar from '~/components/FilterSidebar/FilterSidebar';
import ProductCard from '~/components/ProductCard/ProductCard';
import SortPopup from '~/components/SortPopup/SortPopup';
import useFilter from '~/hooks/common/useFilter';
import { useGetAllProducts } from '~/hooks/Products/Queries/useGetAllProducts';
('~/hooks/Products/Queries/useGetAllProducts');
import { DownOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Dropdown, Empty, Pagination, RadioChangeEvent, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import banner from '~/assets/img/Desktop_Homepage_Banner01.jpg';
import { IProduct } from '~/types/Product';
import { CiGrid2H, CiGrid31, CiGrid41 } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import useWindowSize from '~/hooks/_common/useWindowSize';
import { useEffect } from 'react';
import clsx from 'clsx';

const ProductPage = () => {
    const limit = 10;
    const { query, updateQueryParam, reset, grid, updateGridUI } = useFilter();
    const dispatch = useDispatch();
    const { windowWidth } = useWindowSize();
    const queryKeys = Object.keys(query);
    let isResetFilter = false;
    const { data: productResponse, isLoading: isProductLoading } = useGetAllProducts(query);
    const products = productResponse?.products;
    const totalProducts = products?.length;
    const totalDocs = productResponse?.totalDocs;

    const productsData: IProduct[] = [
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

    // check if query key is have one
    if (
        (queryKeys.length === 1 && queryKeys.includes('category')) ||
        (queryKeys.length === 2 && queryKeys.includes('category') && queryKeys.includes('page'))
    ) {
        isResetFilter = false;
    } else if (queryKeys.length > 0) {
        isResetFilter = true;
    }

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, ['sort']: e.target.value });
    };

    const handleReset = () => {
        reset();
    };

    const onPageChange = (page: number) => {
        updateQueryParam({
            ...query,
            page: page.toString(),
            limit: String(limit),
        });
    };

    useEffect(() => {
        if (grid !== '') {
            updateGridUI('');
        }
    }, [windowWidth]);

    console.log(grid);

    return (
        <div className='2xl:max-w-screen-default mx-4 w-full default:mx-auto lg:max-w-[1200px]'>
            <div className='flex gap-4'>
                <div className='mt-6 basis-1/4'>
                    <FilterSidebar />
                </div>
                <div className='mt-4 flex-1 px-2'>
                    <div className='breadcrumb'>
                        <Breadcrumb
                            className='py-4 text-base'
                            separator='>'
                            items={[
                                {
                                    title: <Link to={'/'}>Trang chủ</Link>,
                                },
                                {
                                    title: <Link to='/products'>Sản phẩm</Link>,
                                },
                            ]}
                        />
                    </div>
                    <div className='my-4 h-[300px]'>
                        <img src={banner} alt='products banner' className='h-full w-full object-cover' />
                    </div>
                    <div className='border-opacity-5 my-5 flex justify-between border-b border-black/10 pb-4'>
                        <div className='flex items-center gap-1'>
                            <span className='font-medium'>{totalProducts}</span>
                            <span className='font-normal'>sản phẩm</span>
                        </div>
                        <div className='flex gap-3'>
                            <div className='flex items-center gap-3'>
                                <Dropdown
                                    placement='bottomLeft'
                                    trigger={['click']}
                                    dropdownRender={() => <SortPopup value={query?.sort} onChange={onChange} />}
                                >
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <UnorderedListOutlined style={{ fontSize: 20 }} />
                                        <span className='font-medium'>Sắp xếp theo</span>
                                        <DownOutlined />
                                    </div>
                                </Dropdown>
                            </div>
                            {windowWidth > 1000 && (
                                <div className='flex items-center gap-2'>
                                    <CiGrid2H
                                        size={24}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            updateGridUI('2');
                                            console.log('2');
                                        }}
                                    />
                                    <CiGrid41
                                        size={24}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            updateGridUI('4');
                                            console.log('4');
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {isResetFilter && (
                        <Button htmlType='button' type='default' onClick={handleReset} className='mt-4'>
                            Đặt lại
                        </Button>
                    )}
                    <div className='my-4'>
                        <div
                            className={clsx('grid gap-4', {
                                'grid-cols-2': grid === '2',
                                'grid-cols-4': grid === '4',
                                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': !grid,
                            })}
                        >
                            {productsData?.map((item) => <ProductCard item={item} key={item._id} />)}
                        </div>

                        {products && products?.length === 0 && <Empty />}
                        {isProductLoading && <Skeleton />}
                        {products && products?.length > 0 && (
                            <Pagination
                                className='item-center my-4 flex justify-center'
                                current={Number(query.page) || 1}
                                pageSize={limit}
                                total={totalDocs}
                                onChange={onPageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
