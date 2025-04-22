import { useQuery } from '@tanstack/react-query';
import { STATS_ENDPOINT } from '~/constants/endPoint';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

export const useDailyStats = () => {
    return useQuery({
        queryKey: [QUERY_KEY.DAILY_STATS],
        queryFn: async () => {
            const { data } = await instance.get(STATS_ENDPOINT.DAILY_STATS);
            return data;
        },
    });
};
