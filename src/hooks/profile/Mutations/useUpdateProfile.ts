import { QUERY_KEY } from '~/constants/queryKey';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '~/services/user.service';

export const useMutationUpdateProfle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.USERS],
        mutationFn: (payload: FormData) => userService.updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS_PROFILE, QUERY_KEY.USERS],
            });
            showMessage('Tài khoản của bạn đã được cập nhật', 'success');
        },
    });
};
