import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalTest } from 'src/app/shared/model/technical-test';
import { ArrayType } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Item {
  id: number,
  name_project: string,
  score: string,
  numberHits: number,
  numberError: number,
  startDate:string,
  endDate:string,
  url: string,
}

@Component({
  selector: 'app-technical-test-view-technical-resource',
  templateUrl: './technical-test-view-technical-resource.component.html',
  styleUrls: ['./technical-test-view-technical-resource.component.css']
})

export class TechnicalTestViewTechnicalResourceComponent implements OnInit {

  list_technical_test: Item[] = [
    {
      "id": 1,
      "name_project": "Angeles azules",
      "score": "5.9",
      "numberHits": 6,
      "numberError": 4,
      "startDate": "2023-10-11",
      "endDate": "2023-10-12",
      "url": "technical_test/view/1"
    },
    {
      "id": 2,
      "name_project": "Botas azules",
      "score": "",
      "numberHits": 0,
      "numberError": 0,
      "startDate": "",
      "endDate": "",
      "url": "technical_test/view/2"
    },
    {
      "id": 3,
      "name_project": "Camisas azules",
      "score": "1.58",
      "numberHits": 2,
      "numberError": 8,
      "startDate": "2023-10-14",
      "endDate": "2023-10-19",
      "url": "technical_test/view/3"
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

  closeTechnicalTest() {
    this.router.navigate([`/technical_test/list_for_technical_resource`]);
  }

}
