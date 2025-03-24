import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { QUERY_KEY } from '@/constants/queryKey';
import wishlistService from '@/services/wishlist.service';
import { RootState } from '@/store/store';

const useGetAllWishlist = (params: object) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return useQuery({
        queryKey: [QUERY_KEY.WISHLIST.LIST, ...Object.values(params), ...Object.keys(params)],
        queryFn: () => wishlistService.getAllWishlist(params),
        enabled: !!user,
    });
};

export default useGetAllWishlist;
