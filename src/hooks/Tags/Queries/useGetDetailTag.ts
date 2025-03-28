import { QUERY_KEY } from '@/constants/queryKey';
import tagService from '@/services/tag.service';
import { useQuery } from '@tanstack/react-query';

const useGetDetailTag = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.TAGS, id],
        queryFn: async () => {
            const res = await tagService.getDetail(id);
            return res.data;
        },
        enabled: !!id,
    });
};

export default useGetDetailTag;
