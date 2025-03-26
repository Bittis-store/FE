import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';
import { useQuery } from '@tanstack/react-query';

const useGetCategoriesMenu = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES],
        queryFn: () => categoryService.getALLCategoriesNoParams(),
    });
};

export default useGetCategoriesMenu;
