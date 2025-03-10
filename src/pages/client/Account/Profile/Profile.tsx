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

    return <></>;
};

export default Profile;
