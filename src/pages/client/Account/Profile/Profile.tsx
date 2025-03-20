// import StaticImages from '@/assets';
// import WrapperList from '@/components/_common/WrapperList';
// import useWindowSize from '@/hooks/_common/useWindowSize';
// import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, ConfigProvider, Form, FormProps, Image, Input, Modal, Upload, UploadFile, UploadProps } from 'antd';
// import { useEffect, useState } from 'react';
// // import { useMutationUpdateProfle } from '@/hooks/profile/Mutations/useUpdateProfile';
// import useGetProfile from '@/hooks/profile/Queries/useGetProfile';
// import { ACCEPT_FILE_TYPE, FileType, getBase64, MAX_SIZE } from '@/pages/Admin/_product_/Helper/_helper_';
// import convertApiResponseToFileList from '@/pages/Admin/_product_/Helper/convertImageUrlToFileList';
// import { IProductFiles, IThumbnailAntd } from '@/types/Product';
// import { errorMessage } from '@/validation/Products/Product';
// import useSendResetPassword from '@/hooks/Auth/Mutation/useSendResetPassword';
// import { useMutationUpdateProfle } from '@/hooks/profile/Mutations/useUpdateProfile';
// import useChangePassword from '@/hooks/users/Mutations/useChangePassword';
// import { ErrorMessage } from '@/validation/Message';

type ChangePassword = {
    password: string;
    newPassword: string;
    retypePassword: string;
};

const Profile = () => {
    const [loading, setLoading] = useState(false);

    const { mutate: updateProfile, isPending } = useMutationUpdateProfle();
    const { mutate: changePassword, isPending: isChangePasswordPending } = useChangePassword();

    const { mutate: sendResetPassword, error, isError, isPending: isPendingPassword } = useSendResetPassword();

    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');

    const [form] = Form.useForm();

    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const windowSize = useWindowSize();

    const { data } = useGetProfile();
    const profile = data?.data;

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    type FieldType = {
        name: string;
        email: string;
        phone: string;
        avatar?: IProductFiles;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const formDataUpdateProfile = new FormData();

        formDataUpdateProfile.append('name', values.name);
        formDataUpdateProfile.append('email', values.email);
        formDataUpdateProfile.append('phone', values.phone);
        formDataUpdateProfile.append('avatar', (values.avatar?.fileList[0] as IThumbnailAntd)?.originFileObj);

        updateProfile(formDataUpdateProfile);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const thumbnailValidator = async (_: any, thumbnail: IProductFiles) => {
        if (
            thumbnail &&
            thumbnail.fileList &&
            thumbnail.fileList.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (thumbnail.fileList[0] as any).originFileObj
        ) {
            if (thumbnail?.fileList?.length < 1 || !thumbnail) {
                return errorMessage('Please input your thumbnail!');
            }
            if (thumbnail && thumbnail.file.size && thumbnail?.file.size >= MAX_SIZE) {
                return errorMessage('Image size must be smaller than 5MB!');
            }
            if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
                return errorMessage('Only accept png, jpg and jpeg type!');
            }
        }
        return Promise.resolve();
    };

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                name: profile.name,
                phone: profile.phone,
                email: profile.email,
            });
        }
    }, [profile, form]);

    useEffect(() => {
        if (profile) {
            const thumbnailConvert = convertApiResponseToFileList({
                url: profile?.avatar,
                urlRef: profile?.avatar,
                isArr: true,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as UploadFile<any>[];

            setThumbnailFile(thumbnailConvert);
        }
    }, [profile]);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewThumbnail(file.url || (file.preview as string));
        setPreviewThumbnailOpen(true);
    };

    const customItemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
        return (
            <div className='ant-upload-list-item ant-upload-list-item-undefined'>
                <img className='' src={file.thumbUrl || file.url} alt={file.name} />
                <span className='ant-upload-list-item-actions'>
                    <span
                        onClick={actions.preview}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <EyeOutlined />
                    </span>
                    <span
                        onClick={actions.remove}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <DeleteOutlined />
                    </span>
                </span>
            </div>
        );
    };

    const handleChangePassword: FormProps<ChangePassword>['onFinish'] = (values) => {
        changePassword(
            {
                password: values.password,
                newPassword: values.newPassword,
            },
            {
                onSuccess() {
                    handleCancel();
                },
            }
        );
        form.resetFields();
    };

    return (
        <>
            <WrapperList classic title='Thông tin của tôi' className='my-0'>
                {/* @Content */}
                <div className='flex items-center justify-center'>
                    <div className='w-[80%] rounded-2xl bg-white px-6 py-4'>
                        <Form form={form} layout='vertical' className='w-full' onFinish={onFinish}>
                            <Form.Item<FieldType>
                                label='Avatar'
                                name='avatar'
                                className='font-medium text-[#08090F]'
                                dependencies={['thumbnail']}
                                rules={[
                                    {
                                        validator: thumbnailValidator,
                                    },
                                ]}
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    listType='picture-card'
                                    itemRender={customItemRender}
                                    fileList={thumbnailFile}
                                    onPreview={(file) => handlePreview(file)}
                                    onChange={handleChangeThumbnail}
                                    maxCount={1}
                                >
                                    {thumbnailFile.length >= 1 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            {previewThumbnail && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewThumbnailOpen,
                                        onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                    }}
                                    src={previewThumbnail || StaticImages.userImageDf}
                                />
                            )}

                            <Form.Item<FieldType> label='Họ và tên' className='mt-1' name='name'>
                                <Input placeholder='Họ và tên' className='py-3' />
                            </Form.Item>

                            <Form.Item<FieldType> label='Số điện thoại' name='phone'>
                                <Input placeholder='Số điện thoại' className='py-3' />
                            </Form.Item>

                            <Form.Item<FieldType> label='Email' className='mt-1' name='email'>
                                <Input placeholder='Email' className='py-3' />
                            </Form.Item>

                            <Form.Item>
                                <div className='flex flex-wrap justify-between gap-5 md:flex-nowrap'>
                                    <Button
                                        className='block w-full rounded-3xl bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                        size='large'
                                        htmlType='submit'
                                        loading={isPending}
                                    >
                                        Cập nhật thông tin
                                    </Button>

                                    {profile && (
                                        <Button
                                            type='primary'
                                            size='large'
                                            danger
                                            // onClick={showModal}
                                            onClick={() => sendResetPassword({ email: profile.email! })}
                                            className='w-full rounded-3xl'
                                            loading={isPendingPassword}
                                        >
                                            Thay đổi mật khẩu
                                        </Button>
                                    )}
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <Modal
                    open={open}
                    onOk={handleOk}
                    centered
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={
                        <Button
                            className='mb-8 block w-full rounded-3xl border-black bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                            size='large'
                        >
                            Cập nhật thông tin
                        </Button>
                    }
                    width={windowSize.windowWidth >= 768 ? '460px' : '90vw'}
                >
                    <div>
                        <div className='text-center'>
                            <h3 className='mt-[52px] mb-2 block text-xl font-medium'>Thay đổi mật khẩu</h3>
                            <p className='mx-auto mb-8 w-[55%] text-sm text-gray-500'>
                                Bạn cần tạo mật khẩu từ 6 đến 16 ký tự để bảo vệ tài khoản tốt hơn.
                            </p>
                        </div>
                        <Form layout='vertical'>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Mật khẩu cũ' className='py-3' />
                            </Form.Item>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Mật khẩu mới' className='py-3' />
                            </Form.Item>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Nhập lại mật khẩu' className='py-3' />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </WrapperList>
        </>
    );
};

export default Profile;
