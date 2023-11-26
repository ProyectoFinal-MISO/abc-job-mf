import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalTest } from 'src/app/shared/model/technical-test';
import { ArrayType } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Item {
  id: number,
  name: string,
  name_project: string,
  score: string,
  url: string
}

@Component({
  selector: 'app-technical-test-create-employee',
  templateUrl: './technical-test-create-employee.component.html',
  styleUrls: ['./technical-test-create-employee.component.css']
})

export class TechnicalTestCreateEmployeeComponent implements OnInit {

  list_technical_test: Item[] = [
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
  idFromUrl: any
  item: any

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.idFromUrl = this.route.snapshot.paramMap.get('id');
    this.item = this.getItemById(this.idFromUrl)
  }

  getItemById(itemId: number) {
    for (let index = 0; index < this.list_technical_test.length; index++) {
      if (this.list_technical_test[index].id == itemId) {
        return this.list_technical_test[index];
      }
    }
    return []
  }

  addTechnicalTest() {
    this.toastr.success(`Succesful`, 'Success', {
      progressBar: true,
    });
    this.router.navigate([`/technical_test/list_for_employee`]);
  }

}
