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
      "name": "Anita Arias",
      "name_project": "Angeles azules",
      "url": "technical_test/add/1"
    },
    {
      "id": 2,
      "name": "Berta Bonito",
      "name_project": "Botas azules",
      "url": "technical_test/add/2"
    },
    {
      "id": 3,
      "name": "Carlota Caceres",
      "name_project": "Camisas azules",
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
