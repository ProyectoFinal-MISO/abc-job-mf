import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technical-test-list-employee',
  templateUrl: './technical-test-list-employee.component.html',
  styleUrls: ['./technical-test-list-employee.component.css']
})
export class TechnicalTestListEmployeeComponent implements OnInit {

  list_technical_test: any = [];

  constructor() { }

  ngOnInit() {
    this.list_technical_test = [
      {
        "id": 1,
        "name": "Ana Gabriela López Gómez",
        "name_project": "Vanguard",
        "score": "5.9",
        "url": "technical_test/add/1"
      },
      {
        "id": 2,
        "name": "Francisco Miguel Rodríguez García",
        "name_project": "Cretta",
        "score": "",
        "url": "technical_test/add/2"
      },
      {
        "id": 3,
        "name": "Gabriela Alejandra Hernández Mendoza",
        "name_project": "Anubis",
        "score": "1.58",
        "url": "technical_test/add/3"
      }
    ]
  }

  public getList() {
    return this.list_technical_test
  }

}
