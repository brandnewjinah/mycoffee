export interface Ratio {
  id: string;
  ingredient: string;
  value: string;
}

export interface Directions {
  [key: string]: string | undefined;
}

export interface Ingredients {
  [key: string]: string | undefined;
}

export interface Recipe {
  _id?: string;
  id: string;
  name: string;
  desc: string;
  type: string;
  ingredients: Ingredients[];
  directions: Directions[];
  ratio: Ratio[];
}

export interface Recipes {
  data: Recipe[];
  status: string;
  count: number;
  page: number;
  pages: number;
}

export interface RecipeErrors {
  name?: string;
  desc?: string;
}
