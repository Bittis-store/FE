import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useSendVerify } from '~/hooks/Auth/Mutation/useSendVerify';
import { useVerifyAccount } from '~/hooks/Auth/Mutation/useVerifyAccount';
import { Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import emailActive from '~/assets/icon/email-is-active.svg';
import tokenExpired from '~/assets/icon/email-token-expired-new.svg';

const VerifyAccount = () => {
    useDocumentTitle('BITISTORE - Kích hoạt tài khoản');

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('tk') || '';
    const email = searchParams.get('email') || '';

    const { mutate, isError, isPending, error } = useVerifyAccount(token);
    const { mutate: sendMail, isPending: pendingSend } = useSendVerify();

    const verifyAccount = useCallback(() => {
        if (token) mutate();
    }, [token, mutate]);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        verifyAccount();
    }, [token, verifyAccount, navigate]);

    const handleLogin = useCallback(() => navigate('/login'), [navigate]);
    const handleResend = useCallback(() => sendMail({ email }), [sendMail, email]);

    if (isPending) return null;

    return (
        <div className='mt-2'>
            <div className='flex w-full flex-col items-center justify-center'>
                <div className='mt-2 flex w-[40%] flex-col items-center p-5'>
                    <h3 className='text-center text-2xl font-bold text-black'>
                        {isError ? 'Account not Activated' : 'Account Activated'}
                    </h3>
                    <div className='relative mt-6'>
                        <img
                            src={isError ? tokenExpired : emailActive}
                            alt={isError ? 'token expired' : 'email active'}
                            className='h-24 w-24'
                        />
                    </div>
                    <div className='mt-8'>
                        <h3 className='text-center text-xl font-semibold'>
                            {isError ? error.response?.data?.message : 'Chào mừng tới với Bitistore'}
                        </h3>
                        <p className='mt-6 text-center'>
                            {isError
                                ? 'Rất tiếc, đã xảy ra lỗi khi xác minh email của bạn. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được giúp đỡ.'
                                : 'Cảm ơn bạn, email của bạn đã được xác minh thành công. Tài khoản của bạn hiện đã được kích hoạt. Vui lòng nhấp vào nút Đăng nhập để truy cập vào tài khoản của bạn.'}
                        </p>
                        <div className='mt-4 flex justify-center'>
                            {isError ? (
                                <button
                                    onClick={handleResend}
                                    className='bg-primary w-[200px] cursor-pointer rounded-lg py-2 font-semibold text-white'
                                    disabled={pendingSend}
                                >
                                    {pendingSend ? <Spin /> : 'Gửi lại mã kích hoạt'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className='bg-primary cursor-pointer rounded-lg px-5 py-2 font-semibold text-white'
                                >
                                    Đăng nhập
                                </button>
                            )}
                        </div>
                        {!isError && <p className='mt-4 text-center'>Cảm ơn đã lựa chọn Bitistore</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
