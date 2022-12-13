export interface Eating {
  meal: string;
  description: string;
  calories: string;
}

export interface EatingMutation extends Eating {
id: string;
}

export interface EatingList {
  [id: string]: EatingMutation;
}