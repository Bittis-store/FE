import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { QUERY_KEY } from '@/constants/queryKey';
import wishlistService from '@/services/wishlist.service';
import { RootState } from '@/store/store';

export const useMutationRemoveWishList = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.auth.user);
    const { mutate: removeWishList, ...rest } = useMutation({
        mutationKey: [QUERY_KEY.WISHLIST.REMOVE],
        mutationFn: (payload: { productId: string }) => wishlistService.removeWishlist(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.WISHLIST.LIST],
            });
            // showMessage('Product successfully removed from wishlist!', 'success');
        },
    });
    const handleRemoveWishList = (id: string) => {
        if (user) {
            const data = {
                productId: id,
            };
            removeWishList(data);
        }
    };

    return { handleRemoveWishList, ...rest };
};
