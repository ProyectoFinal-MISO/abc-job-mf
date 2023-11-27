import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from 'src/app/shared/model/evaluations';
import { ArrayType } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Item {
  id: number,
  name_project: string,
  url: string,
  score: number
}

@Component({
  selector: 'app-evaluation-view-technical-resource',
  templateUrl: './evaluations-view-technical-resource.component.html',
  styleUrls: ['./evaluations-view-technical-resource.component.css']
})

export class EvaluationViewTechnicalResourceComponent implements OnInit {

  list_evaluations: Item[] = [
    {
      "id": 1,
      "name_project": "Vanguard",
      "url": "evaluations/view/1",
      "score": 3,
    },
    {
      "id": 2,
      "name_project": "Cretta",
      "url": "evaluations/view/2",
      "score": 2,
    },
    {
      "id": 3,
      "name_project": "Anubis",
      "url": "evaluations/view/3",
      "score": 5,
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

  closeEvaluation() {
    this.router.navigate([`/evaluations/list_for_technical_resource`]);
  }

}
