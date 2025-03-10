import { AxiosResponse } from 'axios';
import { ILoginResponse } from '~/types/user';
import instance from '~/utils/api/axiosIntance';
import { LoginFormData, RegisterFormData } from '~/validation/Auth/Auth';

const AuthServices = {
    async login(body: LoginFormData) {
        const data = await instance.post('/auth/login', body);
        return data.data;
    },
    async register(body: Omit<RegisterFormData, 'confirmPassword'>) {
        const data = await instance.post<RegisterFormData, AxiosResponse<ILoginResponse>>('/auth/register', body);
        return data.data;
    },
    async doLogout() {
        return instance.post(`/logout`);
    },
};

export default AuthServices;
