import { EmployeeViewComponent } from './employee-view.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('EmployeeViewComponent', () => {
  let component: EmployeeViewComponent;
  let fixture: ComponentFixture<EmployeeViewComponent>;

  let debug: DebugElement;
  let div: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),
      ReactiveFormsModule,ToastrModule.forRoot(),
      NgbModule],
      declarations: [ EmployeeViewComponent ],
      providers: [
        NgbActiveModal,
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    div = fixture.nativeElement.querySelector('div');
  });
  it('should view', () => {
    expect(component).toBeTruthy();
  });
});
