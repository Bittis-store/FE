import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import orderService from '@/services/order.service';
import { Params } from '@/types/Api';

const useGetMyOrders = (params: Params) => {
    return useQuery({
        queryKey: [
            QUERY_KEY.MY_ORDERS,
            QUERY_KEY.ORDERS,
            ...Object.values(params),
            ...Object.keys(params),
        ],
        queryFn: () => orderService.myOrder(params),
    });
};

export default useGetMyOrders;
