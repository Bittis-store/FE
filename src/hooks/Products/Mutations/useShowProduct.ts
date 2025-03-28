import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const useShowProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProductServices.showProduct(id),
        onSuccess() {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS) || query.queryKey.includes(QUERY_KEY.CART),
            });
            showMessage('Đã hiện sản phẩm!', 'success');
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useShowProduct;
