import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';

export const useMonthlyStats = (year: number) => {
    return useQuery({
        queryKey: [QUERY_KEY.MONTHLY_STATS, year],
        queryFn: () => statsService.getOrderAndRevenueByMonthly(year),
    });
};
