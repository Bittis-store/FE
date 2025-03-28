import { useQuery } from '@tanstack/react-query';
import request from '../../utils/api/axiosIntance';
import { QUERY_KEY } from '~/constants/queryKey';
import { HTTP_METHOD } from '~/constants/http';
import { SHIPPING_ENDPOINT } from '~/constants/endPoint';

type Response = {
    code: number;
    code_message: string;
    data: {
        service_id: number;
        short_name: string;
        service_type_id: number;
        config_fee_id: string;
        extra_cost_id: string;
        standard_config_fee_id: string;
        standard_extra_cost_id: string;
        ecom_config_fee_id: number;
        ecom_extra_cost_id: number;
        ecom_standard_config_fee_id: number;
        ecom_standard_extra_cost_id: number;
    }[];
};

export const useGetService = (toDistrict: number) =>
    useQuery({
        queryKey: [QUERY_KEY.SHIPPING_SERVICES],
        queryFn: async () => {
            const response = await request<Promise<Response>>({
                method: HTTP_METHOD.GET,
                url: SHIPPING_ENDPOINT.GET_SERVICES,
                params: { toDistrict },
            });

            return response && (await response.data).data;
        },
    });
