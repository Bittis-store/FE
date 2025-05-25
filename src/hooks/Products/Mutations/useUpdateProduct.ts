import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { ProductServices } from '~/services/products.service';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ data, id }: { data: FormData; id: string }) => ProductServices.updateProduct(data, id),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.PRODUCTS),
            });
            showMessage('Cập nhật sản phẩm thành công!', 'success');
            navigate(ADMIN_ROUTES.PRODUCTS);
        },
        onError: (err) => {
            console.error('Error creating product:', err);
            showMessage(err.message, 'error');
        },
    });
};

export default useUpdateProduct;
