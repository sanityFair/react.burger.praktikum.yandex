export type Ingredient = {
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
  key?: string;
};

export type IngredientResponse = {
  success: boolean;
  data: Ingredient[];
};

export type OrderPayload = {
  ingredients: string[];
};

export type OrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordPayload = {
  email: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};

export type ChangePasswordPayload = {
  password: string;
  token: string;
};

export type RegistrationPayload = {
  email: string;
  password: string;
  name: string;
};

export type User = {
  email: string;
  name: string;
};

export type RegistrationResponse = {
  success: true;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};
