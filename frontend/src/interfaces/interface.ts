export interface Note {
  noteId: string;
  today: string;
  roastDate: string;
  dose: string;
  grind: string;
  time: string;
  shot: string;
}

export interface Bean {
  id: string;
  roaster: string;
  name: string;
  level: string;
  notes: Note[];
}

export interface Taste {
  taste: string;
  value: number;
}
