import { Params } from '~/types/Api';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProduct, IProductResponse } from '~/types/Product';

import instance from '~/utils/api/axiosIntance';
export type IAllProductResponseNew = {
    products: IProduct[];
    page: number;
    totalDocs: number;
    totalPages: number;
};
export const ProductServices = {
    async getProductBestSelling() {
        const data = await instance.get<IAxiosResponse<IProduct[]>>('/products/best-selling');
        return data.data;
    },
    async getAllProducts(params: Params) {
        const res = await instance.get<IAxiosResponse<IProductResponse>>('/products/all', {
            params,
        });
        return res.data;
    },

    async getRelatedProduct(id: string) {
        const data = await instance.get<IAxiosResponse<IProduct[]>>(`/products/related/${id}`);
        return data.data;
    },

    async getDiscount() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`/products/discount`);
        return res.data;
    },
};
