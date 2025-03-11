import { useMutation } from '@tanstack/react-query';
import AuthServices from '~/services/auth.service';

export const useVerifyAccount = (token: string) => {
    return useMutation({
        mutationKey: ['VERIFY_ACCOUNT'],
        mutationFn: () => AuthServices.verify({ token }),
        onSuccess: () => {},
        onError: (error: any) => {},
    });
};
