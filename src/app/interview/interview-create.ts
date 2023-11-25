export class InterviewCreate {
  id: number;
  tittle: string;
  description: string;
  start_date: Date;
  end_date: Date;
  place: string;
  id_employee: number;
  guests: number[];

  constructor(
    id: number,
    tittle: string,
    description: string,
    start_date: Date,
    end_date: Date,
    place: string,
    id_employee: number,
    guests: number[]
  ){
    this.id = id;
    this.tittle = tittle;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.place = place;
    this.id_employee = id_employee;
    this.guests = guests;
  }
}
