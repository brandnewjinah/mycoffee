export interface Bean {
  id: string;
  roaster: string;
  name: string;
  level: string;
  notes: Note[];
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

export interface Initial {
  beans: Beans;
  initial: string;
}
