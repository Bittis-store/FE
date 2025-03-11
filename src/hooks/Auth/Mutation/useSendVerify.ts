import AuthServices from '~/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';

export const useSendVerify = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['SEND_VERIFY'],
        mutationFn: (body: { email: string }) => AuthServices.sendVerify(body),
        onSuccess: (data: any) => {
            console.log(data);
            toast('success', data.data.message);
        },
        onError: (error: any) => {
            console.log(error);
            toast('error', error.response.data.message);
        },
    });
};
