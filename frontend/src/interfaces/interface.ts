export interface Roaster {
  id: number;
  name: string;
}

export interface Bean {
  id: string;
  roaster: string;
  name: string;
  level: string;
  img?: string;
  notes: Note[];
}

export interface Duplicate {
  id?: string;
  roaster?: string;
  name?: string;
  level?: string;
}

export interface BeanErrors {
  roaster?: string;
  name?: string;
}

export interface Beans extends Array<Bean> {}

export interface Feature {
  feature: string;
  value: number;
}

export interface Note {
  id: string;
  today: string;
  roastDate: string;
  dose: string;
  grind: string;
  time: string;
  shot: string;
  features: Feature[];
}

export interface NoteErrors {
  roastDate?: string;
  dose?: string;
  grind?: string;
  time?: string;
  shot?: string;
}

export interface Initial {
  beans: Beans;
  initial: string;
}

export interface Recipe {
  id: string;
  name: string;
  desc: string;
  ingredients: Ingredients[];
  directions: Directions[];
  ratio: Ratio[];
}

export interface Ingredients {
  // [id:string] : string;
  // ingredient: string;
  // amount: string;
  // unit: string;
  [key: string]: string | undefined;
}

export interface Directions {
  id: number;
  direction: Direction[];
}

export interface Direction {
  [key: string]: string | undefined;
}

export interface Ratio {
  index: number;
  id: number;
  ingredient: string;
  value: string;
}

export interface RecipeErrors {
  name?: string;
  desc?: string;
}
