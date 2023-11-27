export class UserSimple {
  id: number;
  userId: number;
  identification: string;
  name: string;
  lastName: string;


  constructor(
    id: number,
    userId: number,
    identification: string,
    name: string,
    start_date: string,
  ){
    this.id = id;
    this.userId = userId;
    this.identification = identification;
    this.name = name;
    this.lastName = lastName;
  }
}
