export class TechnicalTest {
  id: number
  score: string
  numberHits: number
  numberError: number
  startDate?:Date
  endDate?:Date

  constructor(
    id: number,
    score: string,
    numberHits: number,
    numberError: number,
    startDate?:Date,
    endDate?:Date,
  ){
    this.id = id;
    this.score = score;
    this.numberHits = numberHits;
    this.numberError = numberError;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
