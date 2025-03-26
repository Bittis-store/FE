import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { ICategoryFormData } from '~/types/Category';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { categoryValidator } from '~/validation/category/validator';

const CreateCategory = () => {
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();

    const onFinish = (values: ICategoryFormData) => {
        createCategory(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title='Tạo Danh Mục Mới'
            option={
                <Link
                    to={ADMIN_ROUTES.CATEGORIES}
                    className='flex items-center gap-1 text-teal-500 transition-colors duration-300 hover:text-teal-700'
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
                    Quay lại
                </Link>
            }
        >
            <div className='relative mx-auto mt-8 max-w-xl'>
                <div className='absolute inset-0 -z-10 scale-105 -rotate-2 transform rounded-3xl bg-gradient-to-br from-teal-100 via-purple-100 to-pink-100 opacity-50 blur-xl' />

                <div className='transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:scale-[1.02]'>
                    <div className='relative'>
                        <div className='absolute -top-12 -left-12 h-24 w-24 animate-pulse rounded-full bg-teal-400 opacity-20 blur-2xl' />
                        <div className='absolute -right-12 -bottom-12 h-24 w-24 animate-pulse rounded-full bg-purple-400 opacity-20 blur-2xl' />

                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className='space-y-8'
                        >
                            <div className='relative'>
                                <Form.Item<ICategoryFormData>
                                    label={
                                        <span className='text-xl font-bold tracking-tight text-gray-900'>
                                            Tên Danh Mục
                                        </span>
                                    }
                                    name='name'
                                    rules={categoryValidator}
                                    className='mb-0'
                                >
                                    <Input
                                        placeholder='Nhập tên danh mục mới...'
                                        size='large'
                                        className='focus:ring-opacity-50 rounded-xl border-0 bg-gray-50 px-5 py-3 text-gray-700 shadow-inner transition-all duration-300 focus:ring-2 focus:ring-teal-400'
                                    />
                                </Form.Item>
                                <div className='absolute bottom-0 left-0 h-1 w-1/3 rounded-full bg-gradient-to-r from-teal-400 to-purple-500' />
                            </div>

                            <div className='flex justify-end gap-4'>
                                <Link to={ADMIN_ROUTES.CATEGORIES}>
                                    <Button
                                        size='large'
                                        className='rounded-full bg-gray-200 px-6 font-medium text-gray-600 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800'
                                    >
                                        Hủy bỏ
                                    </Button>
                                </Link>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusCircleOutlined />}
                                    loading={isPending}
                                    disabled={isPending}
                                    size='large'
                                    className='rounded-full bg-gradient-to-r from-teal-500 to-purple-600 px-8 font-bold text-white shadow-lg transition-all duration-300 hover:from-teal-600 hover:to-purple-700 hover:shadow-xl'
                                >
                                    Tạo Mới
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </WrapperPageAdmin>
    );
};

export default CreateCategory;
