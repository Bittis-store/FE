export type ICartItemsResponse = {
    productId: string;
    variantId: string;
    quantity: number;
    name: string;
    price: number;
    image: string;
    description: string;
    discount: number;
    color: string;
    size: string;
    stock: number;
    imageUrlRef: string;
    _id: string;
    category: string;
    categoryId: string;
};
export type ICartResponse = {
    userId: string;
    items: ICartItemsResponse[];
};
