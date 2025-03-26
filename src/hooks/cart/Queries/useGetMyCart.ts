import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { useTypedSelector } from '~/store/store';
import { useQuery } from '@tanstack/react-query';

const useGetMyCart = () => {
    const user = useTypedSelector((state) => state.auth.user);
    const { data, ...rest } = useQuery({
        queryKey: [QUERY_KEY.CART, user?._id],
        queryFn: async () => {
            const res = await cartService.getItemCart();
            return res.data;
        },
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?._id,
    });

    return { data, ...rest };
};

export default useGetMyCart;
