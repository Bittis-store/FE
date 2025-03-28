import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { ProductServices } from '~/services/products.service';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: FormData) => ProductServices.createProduct(data),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.PRODUCTS),
            });
            showMessage('Thêm mới sản phẩm thành công!', 'success');
            navigate(ADMIN_ROUTES.PRODUCTS);
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useCreateProduct;
