import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { RootState } from '~/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useToast } from '~/context/ToastProvider';

export const useMutationRemoveItem = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.auth.user);
    const toast = useToast();
    const { mutate: removeItem, ...rest } = useMutation({
        mutationKey: ['REMOVEITEMS'],
        mutationFn: (id: string) => cartService.removeCart(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART, user?._id],
            });
            toast('success', 'Đã xóa sản phẩm khỏi giỏ hàng');
        },
        onError(error) {
            console.log(error);
        },
    });
    const handleRemoveCart = (id: string) => {
        if (user) {
            removeItem(id);
        }
    };
    return { handleRemoveCart, ...rest };
};
