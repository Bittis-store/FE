import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useSendVerify } from '~/hooks/Auth/Mutation/useSendVerify';
import { useVerifyAccount } from '~/hooks/Auth/Mutation/useVerifyAccount';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyAccount = () => {
    useDocumentTitle('BITISTORE - Kích hoạt tài khoản');

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('tk');
    const email = searchParams.get('email');
    const { mutate, isError, isPending, error } = useVerifyAccount(token ? token : '');
    const { mutate: sendMail, isPending: pendingSend } = useSendVerify();

    const verifyAccount = useCallback(() => {
        if (token) {
            mutate();
        }
    }, [token, mutate]);

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        verifyAccount();
    }, [verifyAccount]);

    const handleLogin = () => {
        navigate('/login');
    };
    return (
        <>
            {!isPending && (
                <div className='mt-2'>
                    <div className='flex w-full flex-col items-center justify-center'>
                        <div className='mt-2 flex w-[40%] flex-col items-center p-5'>
                            <>
                                <h3 className='text-center text-2xl font-bold text-black'>
                                    {isError ? 'Account not Activated' : 'Account Activated'}
                                </h3>
                                <div className='relative mt-6'>
                                    <svg
                                        className={`w-[80px] ${!isError && 'fill-green-500'} ${isError && 'fill-red'}`}
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 512 512'
                                    >
                                        <path d='M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z' />
                                    </svg>
                                    {!isError && (
                                        <CheckCircleFilled className='absolute -right-6 bottom-0 text-[30px] text-green-500' />
                                    )}
                                    {isError && (
                                        <CloseCircleFilled className='text-red absolute -right-5 bottom-0 text-[30px]' />
                                    )}
                                </div>
                                <div className='mt-12'>
                                    <h3 className='text-center text-xl font-semibold'>
                                        {isError ? error.response?.data?.message : 'Chào mừng tới với Bitistore'}
                                    </h3>
                                    {!isError ? (
                                        <p className='mt-6 text-center'>
                                            Cảm ơn bạn, email của bạn đã được xác minh thành công. Tài khoản của bạn
                                            hiện đã được kích hoạt. Vui lòng nhấp vào nút Đăng nhập để truy cập vào tài
                                            khoản của bạn.
                                        </p>
                                    ) : (
                                        <p className='mt-6 text-center'>
                                            Rất tiếc, đã xảy ra lỗi khi xác minh email của bạn. Vui lòng thử lại hoặc
                                            liên hệ với bộ phận hỗ trợ để được giúp đỡ.
                                        </p>
                                    )}
                                    <div className='mt-4 flex justify-center'>
                                        {!isError && (
                                            <button
                                                onClick={handleLogin}
                                                className='bg-hover rounded-lg px-5 py-2 font-semibold text-white'
                                            >
                                                Đăng nhập
                                            </button>
                                        )}
                                        {isError && (
                                            <button
                                                onClick={() =>
                                                    sendMail({
                                                        email: email ? email : '',
                                                    })
                                                }
                                                className='bg-primary w-[200px] cursor-pointer rounded-lg py-2 font-semibold text-white'
                                            >
                                                {pendingSend && <Spin />}
                                                {!pendingSend && 'Gửi lại mã kích hoạt'}
                                            </button>
                                        )}
                                    </div>

                                    {!isError && <p className='mt-4 text-center'>Cảm ơn đã lựa chọn Bitistore</p>}
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default VerifyAccount;
