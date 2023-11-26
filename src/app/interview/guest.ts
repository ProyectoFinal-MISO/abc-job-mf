export class Guest {
  id: number;
  id_user: number;
  name_user: string;
  email_user: string;
  type_user: string;
  is_confirm: string;
  score: number;
  id_meet: number;

  constructor(
    id: number,
    id_user: number,
    name_user: string,
    email_user: string,
    type_user: string,
    is_confirm: string,
    score: number,
    id_meet: number
  ){
    this.id = id;
    this.id_user = id_user;
    this.name_user = name_user;
    this.email_user = email_user;
    this.type_user = type_user;
    this.is_confirm = is_confirm;
    this.score = score;
    this.id_meet = id_meet;
  }
}
