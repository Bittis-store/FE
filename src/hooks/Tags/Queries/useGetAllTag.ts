import { QUERY_KEY } from '~/constants/queryKey';
import tagService from '~/services/tag.service';
import { useQuery } from '@tanstack/react-query';

const useGetAllTags = () => {
    return useQuery({
        queryKey: [QUERY_KEY.TAGS],
        queryFn: () => tagService.getAllTagsNoParams(),
    });
};

export default useGetAllTags;
