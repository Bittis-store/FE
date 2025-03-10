export type IUser = {
    _id: string;
    email: string;
    name: string;
    role: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
};

export type ILoginResponse = {
    accessToken: string;
    user: IUser;
};
