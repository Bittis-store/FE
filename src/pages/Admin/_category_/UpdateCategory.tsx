import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationUpdateCategory } from '~/hooks/categories/Mutations/useUpdateCategory';
import { ICategoryFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';
import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useGetDetailCategory from '~/hooks/categories/Queries/useGetDetailCategory';
import { useEffect } from 'react';
import { categoryValidator } from '~/validation/category/validator';

const UpdateCategory = () => {
    const { id } = useParams();
    const { data: categoryRes } = useGetDetailCategory(id as string);
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateCategory();

    const onFinish = (values: ICategoryFormData) => {
        if (id) {
            updateCategory({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id danh mục', 'error');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (categoryRes?.name) {
            form.setFieldValue('name', categoryRes.name);
        }
    }, [categoryRes, form]);

    return (
        <WrapperPageAdmin
            title='Cập Nhật Danh Mục'
            option={
                <Link
                    to={ADMIN_ROUTES.CATEGORIES}
                    className='flex items-center gap-2 text-gray-600 transition-colors duration-200 hover:text-gray-800'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                    Danh sách danh mục
                </Link>
            }
        >
            <div className='mx-auto mt-12 max-w-md'>
                <div className='rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className='space-y-6'
                    >
                        <Form.Item<ICategoryFormData>
                            label={<span className='text-lg font-medium text-gray-900'>Tên Danh Mục</span>}
                            name='name'
                            rules={categoryValidator}
                            className='mb-0'
                        >
                            <Input
                                placeholder='Nhập tên danh mục'
                                size='large'
                                className='rounded-lg border-gray-300 text-gray-700 transition-colors duration-200 focus:border-gray-400 focus:ring-0'
                            />
                        </Form.Item>

                        <div className='flex justify-end gap-3'>
                            <Link to={ADMIN_ROUTES.CATEGORIES}>
                                <Button
                                    size='large'
                                    className='rounded-lg bg-gray-100 px-5 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800'
                                >
                                    Hủy
                                </Button>
                            </Link>
                            <Button
                                type='primary'
                                htmlType='submit'
                                icon={<EditOutlined />}
                                loading={isPending}
                                disabled={isPending}
                                size='large'
                                className='rounded-lg bg-gray-800 px-6 font-medium text-white transition-colors duration-200 hover:bg-gray-900'
                            >
                                Cập Nhật
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </WrapperPageAdmin>
    );
};

export default UpdateCategory;
