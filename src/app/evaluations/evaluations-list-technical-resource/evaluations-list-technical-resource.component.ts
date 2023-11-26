import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-list-technical-resource',
  templateUrl: './evaluations-list-technical-resource.component.html',
  styleUrls: ['./evaluations-list-technical-resource.component.css']
})
export class EvaluationListTechnicalResourceComponent implements OnInit {

  list_evaluations: any = [];

  constructor() { }

  ngOnInit() {
    this.list_evaluations = [
      {
        "id": 1,
        "name_project": "Angeles azules",
        "url": "evaluations/view/1",
        "score": 3,
      },
      {
        "id": 2,
        "name_project": "Botas azules",
        "url": "evaluations/view/2",
        "score": 2,
      },
      {
        "id": 3,
        "name_project": "Camisas azules",
        "url": "evaluations/view/3",
        "score": 5,
      }
    ]
  }

  public getList() {
    return this.list_evaluations
  }

}
