import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.css']
})
export class EvaluationListComponent implements OnInit {

  list_evaluations: any = [];

  constructor() { }

  ngOnInit() {
    this.list_evaluations = [
      {
        "id": 1,
        "name": "Anita",
        "name_project": "Angeles azules",
        "url": "evaluations/add/1"
      },
      {
        "id": 2,
        "name": "Berta",
        "name_project": "Botas azules",
        "url": "evaluations/add/2"
      },
      {
        "id": 3,
        "name": "Carlota",
        "name_project": "Camisas azules",
        "url": "evaluations/add/3"
      }
    ]
  }

  public getList() {
    return this.list_evaluations
  }

}
