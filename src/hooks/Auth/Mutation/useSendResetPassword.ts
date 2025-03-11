import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import AuthService from '~/services/auth.service';

const useSendResetPassword = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['SEND_RESET_PASSWORD'],
        mutationFn: (body: { email: string }) => AuthService.sendMailResetPassword(body),
        onSuccess: (data: any) => {
            toast(data.data.message, 'success');
        },
    });
};

export default useSendResetPassword;
