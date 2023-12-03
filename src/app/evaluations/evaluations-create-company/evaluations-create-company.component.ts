import { Component, OnInit } from '@angular/core';
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
  selector: 'app-evaluation-create-company',
  templateUrl: './evaluations-create-company.component.html',
  styleUrls: ['./evaluations-create-company.component.css']
})

export class EvaluationCreateCompanyComponent implements OnInit {

  list_evaluations: Item[] = [
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

  addEvaluation() {
    this.toastr.success(`Succesful`, 'Success', {
      progressBar: true,
    });
    this.router.navigate([`/evaluations/list_for_company`]);
  }

}
