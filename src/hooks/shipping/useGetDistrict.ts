import { useQuery } from '@tanstack/react-query';
import request from '../../utils/api/axiosIntance';
import { HTTP_METHOD } from '~/constants/http';
import { QUERY_KEY } from '~/constants/queryKey';
import { SHIPPING_ENDPOINT } from '~/constants/endPoint';

export const useGetDistrict = (provinceId: number) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_DISTRICT, provinceId],
        queryFn: async () => {
            const response = await request({
                method: HTTP_METHOD.GET,
                url: `${SHIPPING_ENDPOINT.GET_DISTRICT}`,
                params: { provinceId },
            });

            return response && response.data && response.data.data;
        },
        select: (data) => {
            return data && data.map((item: any) => ({ label: item.DistrictName, value: item.DistrictID }));
        },
    });
};
