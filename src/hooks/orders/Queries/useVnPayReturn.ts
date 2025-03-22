import { QUERY_KEY } from '@/constants/queryKey';
import orderService from '@/services/order.service';
import { useQuery } from '@tanstack/react-query';

const UseVNPayReturn = (params: URLSearchParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.VNPAY_RETURN],
        queryFn: () => orderService.vnpayReturnStatusOrder(params),
        staleTime: 0,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export default UseVNPayReturn;
