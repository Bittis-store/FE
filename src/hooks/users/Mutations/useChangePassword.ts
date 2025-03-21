import { QUERY_KEY } from '@/constants/queryKey';
import { MAIN_ROUTES } from '@/constants/router';
import userService from '@/services/user.service';
import { errorResponse } from '@/types/ErrorResponse';
import showMessage from '@/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useChangePassword = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: { password: string; newPassword: string }) =>
            userService.changePassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });

            showMessage('Đổi mật khẩu thành công', 'success');
            navigate(MAIN_ROUTES.PROFILE);
        },
        onError(error: errorResponse) {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useChangePassword;
