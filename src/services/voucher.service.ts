import { Params } from '~/types/Api';
import { IVoucher, IVoucherDTO } from '~/types/Voucher';
import instance from '~/utils/api/axiosIntance';

export const voucherService = {
    async getAllVoucherForAdmin(params: Params) {
        const res = await instance.get<{
            data: {
                vouchers: IVoucher[];
                totalDocs: number;
            };
        }>(`/voucher/admin/all`, { params });
        return res.data;
    },
    async getDetails(id: string) {
        const res = await instance.get<{data:IVoucher}>(`/voucher/details/${id}`);
        return res.data.data;
    },

};
