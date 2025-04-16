import { QUERY_KEY } from '~/constants/queryKey';
import { ProductServices } from '~/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useGetDetailProductForAdmin = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, id, 'admin'],
        queryFn: async () => {
            const data = await ProductServices.getDetailProductForAdmin(id);
            return data.data;
        },
    });
};
