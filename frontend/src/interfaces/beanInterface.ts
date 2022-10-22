// export interface BaseObjectIF {
//   id: number;
//   value: string;
// }

import { BaseObjectIF } from "./baseInterface";
import { Note } from "./noteInterface";

export interface Roaster {
  id: number;
  name: string;
}

export interface Duplicate {
  _id?: string;
  roaster?: string;
  name?: string;
  level?: string;
}

export interface NewBean {
  _id?: string;
  roaster: string;
  name: string;
  level: string;
  img?: string;
}

export interface BeanUpdates {
  process?: string;
  description?: string;
  region?: string;
  variety?: string;
}

export interface BeanUpdated {
  _id?: string;
  process?: string;
  description?: string;
  region?: string[];
  variety?: string[];
  flavor?: BaseObjectIF[];
}

export interface BeanDetails extends NewBean, BeanUpdated {
  notes: Note[];
}

export interface Beans extends Array<BeanDetails> {}

export interface Initial {
  beans: Beans;
  initial: string;
}

export interface BeanErrors {
  roaster?: string;
  name?: string;
}
