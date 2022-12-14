export interface Eating {
  meal: string;
  description: string;
  calories: string;
}

export interface EatingWithNumber {
  meal: string;
  description: string;
  calories: number;
}

export interface EatingMutation extends EatingWithNumber {
id: string;
}

export interface EatingList {
  [id: string]: EatingMutation;
}