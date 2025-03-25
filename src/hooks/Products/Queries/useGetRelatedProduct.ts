import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useGetRelatedProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.RELATED_PRODUCTS, id],
        queryFn: async () => {
            const data = await ProductServices.getRelatedProduct(id);
            return data.data;
        },
    });
};
