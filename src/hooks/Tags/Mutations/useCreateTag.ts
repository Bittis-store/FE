import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import tagService from '~/services/tag.service';
import { ISizeFormData } from '~/types/Size';
import showMessage from '~/utils/ShowMessage';

export const useMutationCreateTag = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.TAGS],
        mutationFn: (payload: ISizeFormData) => tagService.createTag(payload),

        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) => [QUERY_KEY.TAGS, QUERY_KEY.PRODUCTS].includes(element as string)),
            });
            showMessage('Tạo mới thẻ thành công!', 'success');
            navigate(ADMIN_ROUTES.TAGS, { replace: true });
        },
        onError: (error: any) => {
            showMessage(error.message, 'error');
        },
    });
};
