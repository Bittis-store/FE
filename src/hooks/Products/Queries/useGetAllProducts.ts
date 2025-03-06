import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import { useQuery } from '@tanstack/react-query';
import { Params } from '~/types/Api';

export const useGetAllProducts = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params)],
        queryFn: async () => {
            const data = await ProductServices.getAllProducts(params);
            return data.data;
        },
    });
};
