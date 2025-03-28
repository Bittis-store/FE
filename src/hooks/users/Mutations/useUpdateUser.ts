import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import userService from '~/services/user.service';
import showMessage from '~/utils/ShowMessage';

const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: FormData) => userService.updateUser(data, id),
        onSuccess: () => {
            // queryClient.resetQueries({
            //     predicate: (query) => {
            //         return (query.queryKey[0] as string) === `${QUERY_KEY.USERS}`;
            //     },
            // });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS, id] });
            setTimeout(() => {
                queryClient.prefetchQuery({ queryKey: [QUERY_KEY.USERS], queryFn: () => userService.getAll({}) });
            }, 100);
            showMessage('Update user success', 'success');
            navigate(ADMIN_ROUTES.USERS);
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useUpdateUser;
