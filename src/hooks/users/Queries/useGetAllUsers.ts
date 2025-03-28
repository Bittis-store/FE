import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import userService from '~/services/user.service';
import { Params } from '~/types/Api';

const useGetAllUsers = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.USERS, ...Object.values(params)],
        queryFn: () => userService.getAll(params),
    });
};

export default useGetAllUsers;
