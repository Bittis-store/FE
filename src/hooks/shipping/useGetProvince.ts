import { useQuery } from '@tanstack/react-query';
import request from '../../utils/api/axiosIntance';
import { HTTP_METHOD } from '~/constants/http';
import { QUERY_KEY } from '~/constants/queryKey';
import { SHIPPING_ENDPOINT } from '~/constants/endPoint';

export const useGetProvince = () =>
    useQuery({
        queryKey: [QUERY_KEY.GET_PROVINCE],
        queryFn: async () => {
            const response = await request<any>({
                method: HTTP_METHOD.GET,
                url: SHIPPING_ENDPOINT.GET_PROVINCE,
            });
            return response && response.data && response.data.data;
        },
        select: (data) => {
            return data && data.map((item: any) => ({ label: item.ProvinceName, value: item.ProvinceID }));
        },
    });
