import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationUpdateColor } from '~/hooks/Colors/Mutations/useUpdateColor';
import useGetDetailColor from '~/hooks/Colors/Queries/useGetDetailColor';
import { IColorFormData } from '~/types/Color';
import showMessage from '~/utils/ShowMessage';
import { sizeNameValidator } from '~/validation/size/validator';
import { EditOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { colorHexValidator } from '~/validation/color/validator';

const CreateCategory = () => {
    const { id } = useParams();
    const { data: colorRes } = useGetDetailColor(id as string);
    const [form] = Form.useForm<IColorFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateColor();

    const onFinish: FormProps<IColorFormData>['onFinish'] = (values) => {
        if (id) {
            updateCategory({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id màu', 'error');
        }
    };
    const onFinishFailed: FormProps<IColorFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldValue('name', colorRes?.name);
        form.setFieldValue('hex', colorRes?.hex);
    }, [colorRes]);

    return (
        <WrapperPageAdmin
            title='Cập nhật thông tin màu'
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
                        <Form.Item<IColorFormData>
                            label='Tên màu'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={sizeNameValidator}
                        >
                            <Input placeholder='Nhập tên cho màu...' />
                        </Form.Item>
                    </div>
                    <div className='w-full rounded-lg p-2 px-4'>
                        <Form.Item<IColorFormData>
                            label='Màu sắc'
                            name='hex'
                            className='font-medium text-[#08090F]'
                            getValueFromEvent={(hex) => hex.toHexString()}
                            rules={colorHexValidator}
                            initialValue={'#fffff'}
                        >
                            <ColorPicker showText />
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
