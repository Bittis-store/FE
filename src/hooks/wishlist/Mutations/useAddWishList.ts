import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import wishlistService from '~/services/wishlist.service';

const useMutationAddWishList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [QUERY_KEY.WISHLIST.ADD],
        mutationFn: (payload: { productId: string }) => wishlistService.addWishlist(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.WISHLIST.LIST],
            });
            // showMessage('Product successfully added to wishlist!', 'success');
        },
    });
};

export default useMutationAddWishList;
