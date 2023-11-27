export class Evaluation {
  id: number
  name: string
  name_project: string
  observations: string
  score: number

  constructor(
    id: number,
    name: string,
    name_project: string,
    observations: string,
    score: number
  ){
    this.id = id;
    this.name = name;
    this.name_project = name_project;
    this.observations = observations;
    this.score = score;
  }
}
