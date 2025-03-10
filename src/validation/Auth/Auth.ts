import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ message: 'Vui lòng nhập email!' }).email('Email không đúng định dạng!'),
    password: z.string({ message: 'Vui lòng nhập mật khẩu!' }).min(5, 'Mật khẩu cần ít nhất 5 ký tự!'),
});
export type LoginFormData = z.infer<typeof loginSchema>;
export const registerSchema = z
    .object({
        name: z.string({ message: 'Vui lòng nhập tên của bạn!' }).min(3, { message: 'Tên phải hơn 3 ký tự!' }),
        email: z.string({ message: 'Vui lòng nhập email!' }).email('Email không đúng định dạng!'),
        password: z.string({ message: 'Vui lòng nhập mật khẩu!' }).min(5, 'Mật khẩu cần ít nhất 6 ký tự!'),
        phone: z.string({ message: 'Vui lòng nhập số điện thoại' }).regex(/^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/, {
            message: 'Số điện thoại không hợp lệ',
        }),
        confirmPassword: z
            .string({ message: 'Vui lòng xác nhận lại mật khẩu!' })
            .min(5, 'Mật khẩu cần ít nhất 5 ký tự!'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp!',
        path: ['confirmPassword'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
