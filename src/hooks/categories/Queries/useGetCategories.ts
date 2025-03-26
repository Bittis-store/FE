import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';
import { Params } from '~/types/Api';

const useGetCategories = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES, ...Object.values(params)],
        queryFn: () => categoryService.getAll(params),
    });
};

export default useGetCategories;
