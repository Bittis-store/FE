import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';
import { IYearlyStatsResponse } from '~/types/Stats';

export const useYearlyStats = (year: number): UseQueryResult<IYearlyStatsResponse> =>
    useQuery({
        queryKey: [QUERY_KEY.YEARLY_STATS, year],
        queryFn: async () => {
            const { data } = await statsService.getOrderAndRevenueByYear(year);
            return data;
        },
    });
