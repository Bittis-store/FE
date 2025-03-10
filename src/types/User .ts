export type IUserLogin = {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IUserProfileResponse = {
    _id: string;
    name: string;
    isActive: boolean;
    email: string;
    avatar: string;
    phone: string;
    address: string;
    role: string;
};
export type IUsers = {
    _id: string;
    name: string;
    email: string;
    wishlist: [];
    isActive: boolean;
    avatarRef: string;
    avatar: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IAllUsersResponse = {
    users: IUsers[];
    page: number;
    totalDocs: number;
    totalPages: number;
};
