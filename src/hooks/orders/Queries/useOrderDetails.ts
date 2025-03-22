import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import instance from '@/utils/api/axiosIntance';

const useOrderDetails = (id: string) => {
    /* eslint-disable */
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS, id],
        queryFn: async () => {
            const response = await instance<any>({
                method: 'GET',
                url: `/orders/details/${id}`,
            });
            return response && response.data && response.data.data;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
};
/* eslint-enable */
export default useOrderDetails;
