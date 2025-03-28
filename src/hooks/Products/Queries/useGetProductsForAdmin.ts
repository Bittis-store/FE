import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import { Params } from '~/types/Api';
import { useQuery } from '@tanstack/react-query';

const useGetProductsForAdmin = (params?: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: async () => await ProductServices.getAllForAdmin(params),
    });
};

export default useGetProductsForAdmin;
