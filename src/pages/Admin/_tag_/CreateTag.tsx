import { ADMIN_ROUTES } from '~/constants/router';
import { useMutationCreateTag } from '~/hooks/Tags/Mutations/useCreateTag';
import { ITagFormData } from '~/types/Tag';
import { tagNameValidator } from '~/validation/Auth/tag/validator';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const CreateTag = () => {
    const [form] = Form.useForm<ITagFormData>();
    const { mutate: createTag, isPending } = useMutationCreateTag();

    const onFinish: FormProps<ITagFormData>['onFinish'] = (values) => {
        createTag(values);
    };

    const onFinishFailed: FormProps<ITagFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title='Tạo mới thẻ'
            option={
                <Link to={ADMIN_ROUTES.TAGS} className='underline'>
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
                        <Form.Item<ITagFormData>
                            label='Tên thẻ'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={tagNameValidator}
                        >
                            <Input placeholder='Nhập tên cho thẻ...' />
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

export default CreateTag;
