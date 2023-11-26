import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technical-test-list-technical-resource',
  templateUrl: './technical-test-list-technical-resource.component.html',
  styleUrls: ['./technical-test-list-technical-resource.component.css']
})
export class TechnicalTestListTechnicalResourceComponent implements OnInit {

  list_technical_test: any = [];

  constructor() { }

  ngOnInit() {
    this.list_technical_test = [
      {
        "id": 1,
        "name_project": "Angeles azules",
        "score": "5.9",
        "url": "technical_test/view/1"
      },
      {
        "id": 2,
        "name_project": "Botas azules",
        "score": "",
        "url": "technical_test/view/2"
      },
      {
        "id": 3,
        "name_project": "Camisas azules",
        "score": "1.58",
        "url": "technical_test/view/3"
      }
    ]
  }

  public getList() {
    return this.list_technical_test
  }

}
