import { IAxiosResponse } from '~/types/AxiosResponse';
import { IAllUsersResponse, IUserProfileResponse, IUsers } from '~/types/User ';
import { Params } from '~/types/Api';
import instance from '~/utils/api/axiosIntance';
import { USER_ENDPOINT } from '~/constants/endPoint';

const userService = {
    async getProfile() {
        const res = await instance.get<IAxiosResponse<IUserProfileResponse>>(`${USER_ENDPOINT.PROFILE}`);
        return res.data;
    },

    async getAll(params: Params) {
        const res = await instance.get<IAxiosResponse<IAllUsersResponse>>(`${USER_ENDPOINT.ALL}`, { params });
        return res.data;
    },

    async updateProfile(payload: FormData) {
        const res = await instance.patch(`${USER_ENDPOINT.UPDATE}`, payload);
        return res.data;
    },
    async getDetail(id: string) {
        const res = await instance.get<
            IAxiosResponse<{
                user: IUsers;
            }>
        >(`${USER_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
    async updateUser(data: FormData, id: string) {
        const res = await instance.patch<IAxiosResponse<IUsers>>(`${USER_ENDPOINT.UPDATE_ADMIN}/${id}`, data);
        return res.data;
    },
    async changePassword(data: { password: string; newPassword: string }) {
        const res = await instance.patch<IAxiosResponse<null>>(`${USER_ENDPOINT.CHANGE_PASSWORD}`, data);
        return res.data;
    },
};

export default userService;
