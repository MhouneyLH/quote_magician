export interface Quote {
  auhtor: string;
  text: string;
  likeCount: number;
}

export interface UnitQuote extends Quote {
  id: string;
}

export interface Quotes {
  [key: string]: UnitQuote;
}
