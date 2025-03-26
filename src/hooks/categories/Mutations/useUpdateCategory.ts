import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import categoryService from '~/services/category.service';
import { ICategoryFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

export const useMutationUpdateCategory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.CATEGORIES],
        mutationFn: ({ id, payload }: { id: string; payload: ICategoryFormData }) =>
            categoryService.updateCategory(id, payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.CATEGORIES, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
            showMessage('Đã cập nhật thông tin danh mục!', 'success');
            navigate(ADMIN_ROUTES.CATEGORIES, { replace: true });
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
