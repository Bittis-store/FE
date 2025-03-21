import { useMutation } from '@tanstack/react-query';
import AuthService from '~/services/auth.service';
import showMessage from '~/utils/ShowMessage';

const useSendResetPassword = () => {
    return useMutation({
        mutationKey: ['SEND_RESET_PASSWORD'],
        mutationFn: (body: { email: string }) => AuthService.sendMailResetPassword(body),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            showMessage(data.data.message, 'success', 5000);
        },
    });
};

export default useSendResetPassword;
