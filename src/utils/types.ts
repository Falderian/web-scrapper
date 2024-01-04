export interface IResult {
  id: number;
  title: string;
  rate: number;
  feedbacks_count: number;
  price: string;
  sale_price: string;
  description: string;
  feedbacks: Feedback[];
  metas: Metas;
}

interface Feedback {
  text: string;
  rank: string;
  date: string;
}

interface Metas {}
