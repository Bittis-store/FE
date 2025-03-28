import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useHideProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProductServices.hideProduct(id),
        onSuccess() {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS) || query.queryKey.includes(QUERY_KEY.CART) || query.queryKey.includes(QUERY_KEY.WISHLIST),
            });
            showMessage('Đã ẩn sản phẩm!', 'info');
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useHideProduct;
