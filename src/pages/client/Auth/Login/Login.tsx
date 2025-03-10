import SignImg from '~/assets/img/Desktop_Homepage_Banner01.jpg';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useAuthLogin } from '~/hooks/Auth/Mutation/useAuthLogin';
import { LoginFormData, loginSchema } from '~/validation/Auth/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    useDocumentTitle('BITIS - Đăng nhập');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { mutate, isPending } = useAuthLogin();
    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };
    return (
        <div className='md:max-w-standard mx-auto mt-12 w-full xl:max-w-7xl'>
            <div className='flex justify-between'>
                <div className='flex basis-[50%] justify-center'>
                    <img src={SignImg} alt='Sign Image' className='w-full object-cover' />
                </div>
                <div className='flex basis-[40%] flex-col items-center justify-center gap-10'>
                    <h1 className='font-inter text-4xl font-medium'>Đăng nhập</h1>
                    <p>Chào mừng bạn đến với BITIS</p>
                    <Form onFinish={handleSubmit(onSubmit)} className='flex w-full flex-col' layout='vertical'>
                        <Form.Item
                            label='Email'
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email?.message}
                        >
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} className='h-[48px]' placeholder='Địa chỉ email' />
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Mật khẩu'
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password?.message}
                        >
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <Input.Password {...field} className='h-[48px]' placeholder='Mật khẩu' />
                                )}
                            />
                        </Form.Item>

                        <button
                            disabled={isPending}
                            type='submit'
                            className='bg-global hover:bg-primary mt-4 h-[48px] w-full cursor-pointer rounded-md font-medium text-white duration-300'
                        >
                            {isPending ? <Spin className='text-white' /> : 'Đăng nhập'}
                        </button>
                        <Link
                            to={MAIN_ROUTES.FORGOT_PASSWORD}
                            className='text-global hover:text-primary mt-4 text-center duration-300'
                        >
                            Quên mật khẩu?
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
