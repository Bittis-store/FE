import { Product } from '~/types/Product';

export type IAddWishListResponse = {
    productId: string;
};
type Attribute = {
    key: string;
    name: string;
    value: string;
    _id: string;
};

export type WishListItem = {
    _id: string;
    name: string;
    description: string;
    discount: number;
    images: string[];
    imageUrlRefs: string[];
    thumbnail: string;
    thumbnailUrlRef: string;
    status: string;
    isAvailable: boolean;
    isDeleted: boolean;
    isHide: boolean;
    attributes: Attribute[];
    rating: number;
    reviewCount: number;
    variationIds: {
        _id: string;
        price: number;
    }[];
    brandId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
};
export type IAllWishListResponse = {
    _id: string;
    wishList: Product[];
};
