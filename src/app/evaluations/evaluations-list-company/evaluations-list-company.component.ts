import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-list-company',
  templateUrl: './evaluations-list-company.component.html',
  styleUrls: ['./evaluations-list-company.component.css']
})
export class EvaluationListCompanyComponent implements OnInit {

  list_evaluations: any = [];

  constructor() { }

  ngOnInit() {
    this.list_evaluations = [
      {
        "id": 1,
        "name": "Lalo Lolez",
        "name_project": "Vanguard",
        "url": "evaluations/add/1"
      },
      {
        "id": 2,
        "name": "Francisco Miguel Rodríguez García",
        "name_project": "Cretta",
        "url": "evaluations/add/2"
      },
      {
        "id": 3,
        "name": "Gabriela Alejandra Hernández Mendoza",
        "name_project": "Anubis",
        "url": "evaluations/add/3"
      }
    ]
  }

  public getList() {
    return this.list_evaluations
  }

}
