import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { useTypedSelector } from '~/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

export const useRemoveAll = () => {
    const user = useTypedSelector((state) => state.auth.user?._id);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['REMOVE_ALL_CART', user],
        mutationFn: () => {
            return cartService.removeAllCart();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART, user],
            });
            message.success('Xóa tất cả sản phẩm khỏi giỏ hàng thành công');
        },
        onError: () => {
            message.error('Xoá tất cả sản phẩm khỏi giỏ hàng thất bại');
        },
    });
};
