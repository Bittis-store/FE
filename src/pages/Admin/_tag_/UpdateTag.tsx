import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationUpdateTag } from '~/hooks/Tags/Mutations/useUpdateTag';
import useGetDetailTag from '~/hooks/Tags/Queries/useGetDetailTag';
import { ICategoryFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';
import { categoryValidator } from '~/validation/category/validator';
import { EditOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const CreateCategory = () => {
    const { id } = useParams();
    const { data: categoryRes } = useGetDetailTag(id as string);
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateTag();

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        if (id) {
            updateCategory({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id thẻ', 'error');
        }
    };
    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldValue('name', categoryRes?.name);
    }, [categoryRes]);

    return (
        <WrapperPageAdmin
            title='Cập nhật thông tin thẻ'
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES} className='underline'>
                    Quay lại
                </Link>
            }
        >
            {' '}
            <Form
                form={form}
                layout='vertical'
                className='grid grid-cols-12'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='col-span-8'>
                    <div className='w-full rounded-lg p-2 px-4'>
                        <Form.Item<ICategoryFormData>
                            label='Tên thẻ'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={categoryValidator}
                        >
                            <Input placeholder='Nhập tên cho thẻ...' />
                        </Form.Item>
                    </div>
                </div>
                <div className='border-opacity-20 col-span-4 flex flex-col justify-between border-s border-black px-4'>
                    <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end border-t-2 border-black py-4'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<EditOutlined />}
                            className='px-5'
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default CreateCategory;
