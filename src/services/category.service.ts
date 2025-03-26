import { Params } from 'react-router-dom';
import { CATEGORY_ENDPOINT } from '~/constants/endPoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ICategory, ICategoryFormData, ICategoryPopular, ICategoryResponse, IMenu } from '~/types/Category';
import instance from '~/utils/api/axiosIntance';

const categoryService = {
    async getAll(params: Params) {
        const res = await instance.get<IAxiosResponse<ICategoryResponse>>(`${CATEGORY_ENDPOINT.ALL}`, { params });
        return res.data;
    },
    async getALLCategoriesNoParams() {
        const res = await instance.get<IAxiosResponse<ICategoryResponse>>(`${CATEGORY_ENDPOINT.ALL}`, {
            params: { limit: 10000, page: 1 },
        });
        return res.data;
    },
    async getAllForMenu() {
        const res = await instance.get<IAxiosResponse<IMenu[]>>(`${CATEGORY_ENDPOINT.MENU}`);
        return res.data;
    },

    async getPopular() {
        const res = await instance.get<IAxiosResponse<ICategoryPopular[]>>(`${CATEGORY_ENDPOINT.POPULAR}`);
        return res.data;
    },

    async createCategory(payload: ICategoryFormData) {
        const res = await instance.post<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPOINT.CREATE}`, payload);
        return res.data;
    },

    async updateCategory(id: string, payload: ICategoryFormData) {
        const res = await instance.patch<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPOINT.UPDATE}/${id}`, payload);
        return res.data;
    },

    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
};

export default categoryService;
