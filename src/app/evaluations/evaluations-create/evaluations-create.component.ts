import { Component, OnInit } from '@angular/core';
import { EvaluationListComponent } from '../evaluations-list/evaluations-list.component';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from 'src/app/shared/model/evaluations';
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
  selector: 'app-evaluation-create',
  templateUrl: './evaluations-create.component.html',
  styleUrls: ['./evaluations-create.component.css']
})

export class EvaluationCreateComponent implements OnInit {

  list_evaluations: Item[] = [
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
    for (let index = 0; index < this.list_evaluations.length; index++) {
      if (this.list_evaluations[index].id == itemId) {
        return this.list_evaluations[index];
      }
    }
    return []
  }

  addUser() {
    this.toastr.success(`Succesful`, 'Success', {
      progressBar: true,
    });
    this.router.navigate([`/evaluations/list`]);
  }

}
