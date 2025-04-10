import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import tagService from '~/services/tag.service';
import { ICategoryFormData } from '~/types/Category';
import { errorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useMutationUpdateTag = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.TAGS],
        mutationFn: ({ id, payload }: { id: string; payload: ICategoryFormData }) => tagService.updateTag(id, payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) => [QUERY_KEY.TAGS, QUERY_KEY.PRODUCTS].includes(element as string)),
            });
            showMessage('Đã cập nhật thông tin thẻ!', 'success');
            navigate(ADMIN_ROUTES.TAGS, { replace: true });
        },
        onError: (error: errorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
