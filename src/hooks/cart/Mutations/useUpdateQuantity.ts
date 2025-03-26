import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { useTypedSelector } from '~/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateQuantity = () => {
    const queryClient = useQueryClient();
    const user = useTypedSelector((state) => state.auth.user);
    return useMutation({
        mutationKey: ['UPDATE_QUANTITY'],
        mutationFn: (payload) => cartService.updateQuantity(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART, user?._id],
            });
        },
    });
};
