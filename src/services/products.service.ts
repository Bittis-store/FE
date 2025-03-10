import { PRODUCT_ENDPOINT } from '~/constants/endPoint';
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
        const data = await instance.get<IAxiosResponse<IProduct[]>>(PRODUCT_ENDPOINT.SELLING);
        return data.data;
    },
    async getAllProducts(params: Params) {
        const res = await instance.get<IAxiosResponse<IProductResponse>>(PRODUCT_ENDPOINT.ALL, {
            params,
        });
        return res.data;
    },

    async getRelatedProduct(id: string) {
        const data = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.RELATED}/${id}`);
        return data.data;
    },

    async getDiscount() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.DISCOUNT}`);
        return res.data;
    },
};
