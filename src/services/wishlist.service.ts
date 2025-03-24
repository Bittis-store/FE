import { WISHLIST_ENDPOINT } from '~/constants/endPoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IAddWishListResponse, IAllWishListResponse, WishListItem } from '~/types/WishList';
import instance from '~/utils/api/axiosIntance';

const wishlistService = {
    async getAllWishlist(params?: object) {
        const res = await instance.get<IAxiosResponse<IAllWishListResponse>>(`${WISHLIST_ENDPOINT.MY_WISHLIST}`, {
            params,
        });
        return res.data;
    },
    async addWishlist(body: IAddWishListResponse) {
        const res = await instance.patch<IAxiosResponse<WishListItem>>(`${WISHLIST_ENDPOINT.ADD_WISHLIST}`, body);
        return res.data;
    },
    async removeWishlist(body: IAddWishListResponse) {
        const res = await instance.patch<IAxiosResponse<WishListItem>>(`${WISHLIST_ENDPOINT.REMOVE_WISHLIST}`, body);
        return res.data;
    },
};

export default wishlistService;
