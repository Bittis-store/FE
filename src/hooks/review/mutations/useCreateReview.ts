import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { ICreateReviewPayload } from '~/types/review';
import { reviewService } from '~/services/review.service';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationKey: ['createReview'],
        mutationFn: (body: ICreateReviewPayload) => reviewService.createReview(body),
        onSuccess() {
            toast('success', 'Đánh giá thành công');
            queryClient.refetchQueries({
                predicate(query) {
                    return query.queryKey.includes(QUERY_KEY.ORDERS);
                },
            });
        },
        onError(error: any) {
            toast('error', error.response.data.message);
        },
    });
};

export default useCreateReview;
