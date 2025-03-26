import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';

const useGetDetailCategory = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES, id],
        queryFn: async () => {
            const res = await categoryService.getDetail(id);
            return res.data;
        },
        enabled: !!id,
    });
};

export default useGetDetailCategory;
