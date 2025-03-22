import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import showMessage from '~/utils/ShowMessage';

export default function useShipOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['CONFIRM_ORDER'],
        mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
            orderService.shippingOrder({ orderId, reason }),
        onSuccess() {
            showMessage('Order is shiping!', 'info');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
        },
        onError: () => {
            showMessage('Order confirmation failed.', 'error');
        },
    });
}
