import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useGetProductBest = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS,QUERY_KEY.HOT_PRODUCTS],
        queryFn: async () => {
            const data = await ProductServices.getProductBestSelling();
            return data.data;
        },
    });
};
