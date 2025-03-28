import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateColor } from '~/hooks/Colors/Mutations/useCreateColor';
import { IColorFormData } from '~/types/Color';
import { colorHexValidator, colorNameValidator } from '~/validation/color/validator';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Form, FormProps, Input } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const CreateCategory = () => {
    const [form] = Form.useForm<IColorFormData>();
    const { mutate: createColor, isPending } = useMutationCreateColor();

    const onFinish: FormProps<IColorFormData>['onFinish'] = (values) => {
        createColor(values);
    };

    const onFinishFailed: FormProps<IColorFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title='Tạo mới màu sắc'
            option={
                <Link to={ADMIN_ROUTES.COLORS} className='underline'>
                    Quay lại
                </Link>
            }
        >
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
                            label='Tên màu sắc'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={colorNameValidator}
                        >
                            <Input placeholder='Nhập tên cho màu sắc...' />
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
                    <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end border-t-2 border-black p-4'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<PlusSquareOutlined />}
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default CreateCategory;
