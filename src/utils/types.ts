export type TIngredientItem = {
    dragId?: number;
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

interface IResponse {
    success: boolean;
};

export interface IAuthResponse extends IResponse {
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface IUserResponse extends IResponse {
    user: {
        email: string;
        name: string;
    }
}

export interface IOrderResponse extends IResponse {
    name: string;
    order: {
        number: number;
    }
};

export type TPostIngredientsData = {
    ingredients: string[];
};

export type TRegisterData = {
    name: string;
    email: string;
    password: string;
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TUpdateUserData = {
    name: string;
    email: string;
    password?: string;
};

export type TPostResetCodeData = {
    email: string;
};

export type TPostResetPasswordData = {
    password: string;
    code: string;
};