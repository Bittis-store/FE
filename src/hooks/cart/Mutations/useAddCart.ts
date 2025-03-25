import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { setOpen } from '~/store/slice/cartSlice';
import { useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useMutationAddToCart = () => {
    const cartDispatch = useDispatch();
    const queryClient = useQueryClient();
    const user = useTypedSelector((state) => state.auth.user);
    return useMutation({
        mutationKey: ['ADD_TO_CART'],
        mutationFn: (payload: any) => cartService.addToCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART, user?._id],
            });
            cartDispatch(setOpen());
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
