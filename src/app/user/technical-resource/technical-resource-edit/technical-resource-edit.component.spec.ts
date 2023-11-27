import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalResourceEditComponent } from './technical-resource-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TechnicalResourceEditComponent', () => {
  let component: TechnicalResourceEditComponent;
  let fixture: ComponentFixture<TechnicalResourceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),
      ReactiveFormsModule,ToastrModule.forRoot(),
      CarouselModule, NgbModule],
      declarations: [TechnicalResourceEditComponent]
    });
    fixture = TestBed.createComponent(TechnicalResourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
