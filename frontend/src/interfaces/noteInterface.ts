export interface NewNote {
  _id?: string | undefined;
  date: string;
  roastDate: string;
  dose: string;
  grind: string;
  time: string;
  shot: string;
}

export interface Note extends NewNote {
  features: Feature[];
}

export interface Feature {
  _id?: string;
  feature: string;
  value: number;
}

export interface NoteErrors {
  roastDate?: string;
  dose?: string;
  grind?: string;
  time?: string;
  shot?: string;
}
