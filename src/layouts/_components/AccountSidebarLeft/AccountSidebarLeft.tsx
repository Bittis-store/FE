import { useState, useEffect } from 'react';
import StaticImages from '~/assets';
import MenuAccount from './MenuAccount';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';
// import { useSendVerify } from '@/hooks/auth/useSendVerify';
import { Avatar } from 'antd';

const AccountSidebarLeft = () => {
    const { data } = useGetProfile();

    const profile = data?.data;

    // const { mutate } = useSendVerify();
    const getInitialCountdown = () => {
        const savedCountdown = localStorage.getItem('countdown');
        return savedCountdown ? parseInt(savedCountdown, 10) : 0;
    };

    const [countdown, setCountdown] = useState(getInitialCountdown);
    const [isButtonDisabled, setIsButtonDisabled] = useState(countdown > 0);

    useEffect(() => {
        /* eslint-disable */
        let timer: any;
        /* eslint-enable */
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    const newCountdown = prev - 1;
                    localStorage.setItem('countdown', newCountdown.toString());
                    return newCountdown;
                });
            }, 1000);
        } else {
            setIsButtonDisabled(false);
            localStorage.removeItem('countdown');
        }
        return () => clearInterval(timer);
    }, [countdown]);

    // const handleVerifyNowClick = () => {
    //     if (profile) {
    //         mutate({ email: profile.email });
    //         setCountdown(30);
    //         setIsButtonDisabled(true);
    //         localStorage.setItem('countdown', '30');
    //     }
    // };

    useEffect(() => {
        console.log(profile);
    }, [profile]);
    return (
        <>
            <div className='hidden flex-col bg-white md:flex'>
                <div className=''>
                    <h1 className='pt-5 text-center text-2xl font-semibold text-[#da291c] uppercase'>Tài khoản</h1>
                </div>

                <div className='my-5 flex flex-col items-center justify-center gap-5'>
                    <Avatar alt='user avatar' size={120} src={profile?.avatar ?? StaticImages.userImageDf}></Avatar>
                    {profile && (
                        <div>
                            <p className='text-center text-[16px] capitalize'>{profile?.name}</p>

                            <div className='flex gap-4'>
                                {/* <p className="text-[16px]">
                                    Trạng thái:{' '}
                                    {profile?.isActive && (
                                        <span className="text-green-500">
                                            Đã kích hoạt
                                        </span>
                                    )}
                                    {!profile?.isActive && (
                                        <span className="text-red">
                                            Chưa kích hoạt
                                        </span>
                                    )}
                                </p> */}

                                {/* {!profile?.isActive && (
                                    <div className="flex items-center">
                                        {!isButtonDisabled && (
                                            <button
                                                onClick={handleVerifyNowClick}
                                                className={`text-blue-400 ${isButtonDisabled ? 'cursor-not-allowed' : ''}`}
                                                disabled={isButtonDisabled}
                                            >
                                                Kích hoạt ngay
                                            </button>
                                        )}
                                        {isButtonDisabled && (
                                            <p className="w-[67px] text-sm text-red">
                                                {countdown}s
                                            </p>
                                        )}
                                    </div>
                                )} */}
                            </div>
                        </div>
                    )}
                </div>
                <MenuAccount isAdmin={profile?.role === 'admin' ? true : false} />
            </div>
        </>
    );
};

export default AccountSidebarLeft;
