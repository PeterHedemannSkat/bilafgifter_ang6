export interface general {
  value: string;
  id: string;
}

export interface optionsTxt {
  options: string[];
  data: any;
  id: string;
}

export interface periodOptions {
  fromYear: number;
  toYear: number;
  split: Date[]
}

export interface specialTxt {
  id: string;
  fn: Function
}

interface Periods {
  from: Date;
  to: Date
}

export {Periods}
