import React, { useCallback } from 'react';
import { Form, Input, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useSendResetPassword from '~/hooks/Auth/Mutation/useSendResetPassword';
import SignImg from '~/assets/img/Desktop_Homepage_Banner01.jpg';

export default function ForgotPassword() {
    useDocumentTitle('BITISTORE - Khôi phục mật khẩu');

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: { email: '' },
    });

    const { mutate, isPending } = useSendResetPassword();

    const onSubmit = useCallback(
        (data: { email: string }) => {
            mutate(data, {
                onError: (err: any) => {
                    const errObj = err.response?.data;
                    if (errObj?.data?.field) {
                        setError('email', { message: errObj.data.message });
                    }
                },
            });
        },
        [mutate, setError]
    );

    return (
        <div className='max-w-screen-default relative mx-12 mt-12 flex justify-around default:mx-auto'>
            <img src={SignImg} alt='Sign Image' className='w-[650px] default:w-[60%]' />
            <div className='flex w-72 flex-col items-center justify-center gap-10 md:w-96'>
                <h1 className='font-inter text-4xl font-medium'>Khôi phục mật khẩu</h1>
                <p>Chúng tôi sẽ gửi mật khẩu mới tới email của bạn</p>

                <Form onFinish={handleSubmit(onSubmit)} className='flex w-full flex-col' layout='vertical'>
                    <Form.Item label='Email' validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} className='h-[48px]' placeholder='Địa chỉ email' />
                            )}
                        />
                    </Form.Item>

                    <button
                        disabled={isPending}
                        type='submit'
                        className='bg-global hover:bg-primary h-[48px] w-full cursor-pointer rounded-md font-medium text-white duration-300'
                    >
                        {isPending ? <Spin className='text-hover' /> : 'Khôi phục mật khẩu'}
                    </button>
                    <Link to='/login' className='text-global hover:text-hover mt-4 text-center duration-300'>
                        Quay về đăng nhập
                    </Link>
                </Form>

                <p className='mx-auto text-gray-600'>
                    Bạn chưa có tài khoản?
                    <Link to='/register' className='ml-2 font-medium hover:underline'>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
}
