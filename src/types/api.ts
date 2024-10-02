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
