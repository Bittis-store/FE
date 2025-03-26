/* eslint-disable no-nested-ternary */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';
import { ICategory } from '~/types/Category';
import { useState } from 'react';

const CategoryList = () => {
    const { query, onSelectPaginateChange, getColumnSearchProps } = useTable<ICategory>();
    const { data: categories } = useGetCategories(query);
    const categoryList = categories?.data.categories || [];
    const totalDocs = categories?.data.totalDocs || 0;
    const currentPage = Number(query.page || 1);
    const [searchText, setSearchText] = useState<string>('');

    const filteredCategories = categoryList.filter((category) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    return (
        <WrapperPageAdmin
            title='Danh Mục Sản Phẩm'
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES_CREATE}>
                    <Button
                        icon={<PlusOutlined />}
                        className='rounded-full bg-gradient-to-r from-teal-500 to-purple-600 px-6 font-semibold text-white shadow-md transition-all duration-300 hover:from-teal-600 hover:to-purple-700 hover:shadow-lg'
                    >
                        Thêm Danh Mục
                    </Button>
                </Link>
            }
        >
            <div className='mt-6 space-y-6'>
                <div className='mx-auto max-w-md'>
                    <Input
                        placeholder='Tìm kiếm danh mục...'
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        size='large'
                        className='focus:ring-opacity-50 rounded-xl border-0 bg-gray-100 px-5 py-3 text-gray-700 shadow-inner transition-all duration-300 focus:ring-2 focus:ring-teal-400'
                        prefix={<span className='text-gray-400'>🔍</span>}
                    />
                </div>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div
                                key={category._id}
                                className='transform rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
                            >
                                <div className='p-5'>
                                    <h3 className='truncate text-lg font-semibold text-gray-800'>{category.name}</h3>
                                    <p className='mt-1 text-sm text-gray-500'>ID: {category._id.slice(0, 8)}...</p>
                                </div>
                                <div className='flex justify-end border-t border-gray-100 p-4'>
                                    <Link to={`${ADMIN_ROUTES.CATEGORIES_EDIT}/${category._id}`}>
                                        <Button
                                            icon={<EditOutlined />}
                                            className='rounded-full bg-teal-100 font-medium text-teal-600 transition-all duration-300 hover:bg-teal-200 hover:text-teal-700'
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full py-10 text-center'>
                            <div className='text-lg text-gray-500'>Không tìm thấy danh mục nào</div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalDocs > 0 && (
                    <div className='mt-8 flex justify-center'>
                        <Pagination
                            current={currentPage}
                            total={totalDocs}
                            pageSize={10}
                            onChange={onSelectPaginateChange}
                            showSizeChanger={false}
                            className='rounded-full bg-white p-2 shadow-md'
                        />
                    </div>
                )}
            </div>
        </WrapperPageAdmin>
    );
};

export default CategoryList;
