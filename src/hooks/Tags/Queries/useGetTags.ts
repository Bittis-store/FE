import { QUERY_KEY } from '@/constants/queryKey';
import tagService from '@/services/tag.service';
import { Params } from '@/types/Api';
import { useQuery } from '@tanstack/react-query';

const useGetTags = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.TAGS, ...Object.values(params)],
        queryFn: () => tagService.getAll(params),
    });
};

export default useGetTags;
