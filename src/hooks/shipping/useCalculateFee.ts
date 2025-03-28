import { useQuery } from '@tanstack/react-query';
import request from '../../utils/api/axiosIntance';
import { QUERY_KEY } from '~/constants/queryKey';
import { HTTP_METHOD } from '~/constants/http';
import { SHIPPING_ENDPOINT } from '~/constants/endPoint';

type Params = {
    serviceId: number;
    districtId: number | null;
    wardCode: string;
};

const useCalculateFee = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.CALCULATE_FEE],
        queryFn: async () => {
            const response = await request({
                method: HTTP_METHOD.GET,
                url: SHIPPING_ENDPOINT.CALCULATE_FEE,
                params: {
                    serviceId: params.serviceId,
                    toDistrictId: params.districtId,
                    toWardCode: params.wardCode,
                },
            });
            return response && response.data && response.data.data;
        },
    });
};

export default useCalculateFee;
