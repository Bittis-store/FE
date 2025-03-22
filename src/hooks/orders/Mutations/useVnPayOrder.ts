import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import showMessage from '~/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataType } from './useCreateOrder';

export const useVnPayOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [`${QUERY_KEY.CHECKOUT}/VNPAY`],
        mutationFn: (payload: DataType) => orderService.checkOutVnPay(payload),
        onSuccess: (data: any) => {
            console.log(data);
            window.location.href = `${data.checkout}`;
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
