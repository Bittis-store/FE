import SignImg from '~/assets/img/male-shoes.jpg';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useAuthRegister } from '~/hooks/Auth/Mutation/useAuthRegister';
import { RegisterFormData, registerSchema } from '~/validation/Auth/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
    useDocumentTitle('BITIS - Đăng ký');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const { mutate, isPending } = useAuthRegister();
    const onSubmit = (data: RegisterFormData) => {
        mutate(data);
    };
    return (
        <div className='md:max-w-standard mx-auto mt-12 w-full xl:max-w-7xl'>
            <div className='flex justify-between'>
                <div className='flex basis-[50%] justify-center'>
                    <img src={SignImg} alt='Sign Image' className='w-full object-cover' />
                </div>
                <div className='flex basis-[40%] flex-col items-center justify-center gap-10'>
                    <h1 className='font-inter text-4xl font-medium'>Đăng ký</h1>
                    <p>Chào mừng bạn đến với BITIS</p>
                    <Form onFinish={handleSubmit(onSubmit)} className='flex w-full flex-col' layout='vertical'>
                        <Form.Item
                            label='Tên người dùng'
                            validateStatus={errors.name ? 'error' : ''}
                            help={errors.name?.message}
                        >
                            <Controller
                                name='name'
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} className='h-[48px]' placeholder='Nhập tên người dùng' />
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Số điện thoại'
                            validateStatus={errors.phone ? 'error' : ''}
                            help={errors.phone?.message}
                        >
                            <Controller
                                name='phone'
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} className='h-[48px]' placeholder='Nhập số điện thoại' />
                                )}
                            />
                        </Form.Item>
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
                        <Form.Item
                            label='Xác nhận mật khẩu'
                            validateStatus={errors.confirmPassword ? 'error' : ''}
                            help={errors.confirmPassword?.message}
                        >
                            <Controller
                                name='confirmPassword'
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        className='h-[48px]'
                                        placeholder='Xác nhận lại mật khẩu'
                                    />
                                )}
                            />
                        </Form.Item>
                        <button
                            disabled={isPending}
                            type='submit'
                            className='bg-global hover:bg-primary h-[48px] w-full cursor-pointer rounded-md font-medium text-white duration-300'
                        >
                            {isPending ? <Spin className='text-hover' /> : 'Đăng ký'}
                        </button>
                    </Form>

                    <p className='mx-auto text-gray-600'>
                        Bạn đã có tài khoản?
                        <Link to='/login' className='ml-2 font-medium hover:underline'>
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
