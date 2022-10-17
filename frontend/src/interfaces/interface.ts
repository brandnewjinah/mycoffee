import { ChangeEvent } from "react";

//bean
export interface Roaster {
  id: number;
  name: string;
}

export interface Bean {
  // [x: string]: any;
  _id?: string;
  roaster: string;
  name: string;
  level: string;
  img?: string;
  notes: Note[];
}

export interface Duplicate {
  _id?: string;
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
  _id?: string;
  feature: string;
  value: number;
}

//note

export interface NoteIF {
  _id?: string;
  date: string;
  roastDate: string;
  dose: string;
  grind: string;
  time: string;
  shot: string;
}

export interface Note {
  _id: string;
  date: string;
  today?: string;
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

//recipe

export interface Recipes {
  data: Recipe[];
  status: string;
  count: number;
  page: number;
  pages: number;
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

export interface Ingredients {
  // [id:string] : string;
  // ingredient: string;
  // amount: string;
  // unit: string;
  [key: string]: string | undefined;
}

export interface Directions {
  [key: string]: string | undefined;
}

// export interface Direction {
//   // [key: string]: string | undefined;
//   id: string;
//   direction: string;
// }

export interface Ratio {
  id: string;
  ingredient: string;
  value: string;
}

export interface RecipeErrors {
  name?: string;
  desc?: string;
}

export interface SelectProps {
  options?: SelectOptionProps[];
  selected?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  fullWidth?: boolean;
}

export interface SelectOptionProps {
  id: number;
  value: string;
  label: string;
  selections: SelectOptionSubProps[];
}

export interface SelectOptionSubProps {
  id: number;
  value: string;
  label: string;
}
