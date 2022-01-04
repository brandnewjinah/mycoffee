export interface Bean {
  id: string;
  roaster: string;
  name: string;
  level: string;
  notes: Note[];
}

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
