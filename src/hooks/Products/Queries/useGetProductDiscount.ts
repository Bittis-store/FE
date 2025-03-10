import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useGetProductDiscount = () => {
    return useQuery({
        queryKey: [QUERY_KEY.DISCOUNT_PRODUCTS],
        queryFn: async () => {
            const data = await ProductServices.getDiscount();
            return data.data;
        },
    });
};
