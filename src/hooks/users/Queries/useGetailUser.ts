import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import userService from '~/services/user.service';

const useGetDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.USERS, id],
        queryFn: () => userService.getDetail(id),
        enabled: !!id,
    });
};

export default useGetDetail;
