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
    lastName: string,
  ){
    this.id = id;
    this.userId = userId;
    this.identification = identification;
    this.name = name;
    this.lastName = lastName;
  }
}
