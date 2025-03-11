import AuthServices from '~/services/auth.service';
import { doLogin } from '~/store/slice/authSlice';
import { useAppDispatch } from '~/store/store';
import { LoginFormData } from '~/validation/Auth/Auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useToast } from '~/context/ToastProvider';

export const useAuthLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    return useMutation({
        mutationKey: ['LOGIN'],
        mutationFn: async (body: LoginFormData) => {
            const { data } = await AuthServices.login(body);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            dispatch(doLogin(data.user));
            toast('success', 'Đăng nhập thành công.');
            localStorage.setItem('accessToken', data.accessToken);
            navigate('/');
        },
        onError(error: any) {
            toast('error', `${error.response.data.message}`);
        },
    });
};
