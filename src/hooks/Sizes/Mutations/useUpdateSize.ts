import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import sizeService from '~/services/size.service';
import { ICategoryFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

export const useMutationUpdateSize = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.SIZES],
        mutationFn: ({ id, payload }: { id: string; payload: ICategoryFormData }) =>
            sizeService.updateSize(id, payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) => [QUERY_KEY.SIZES, QUERY_KEY.PRODUCTS].includes(element as string)),
            });
            showMessage('Đã cập nhật thông tin kích cỡ!', 'success');
            navigate(ADMIN_ROUTES.SIZES, { replace: true });
        },
        onError: (error: any) => {
            showMessage(error.message, 'error');
        },
    });
};
