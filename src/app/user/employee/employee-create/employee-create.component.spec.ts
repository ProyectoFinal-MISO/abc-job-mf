import { EmployeeCreateComponent } from './employee-create.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('EmployeeCreateComponent', () => {
  let component: EmployeeCreateComponent;
  let fixture: ComponentFixture<EmployeeCreateComponent>;
  let debug: DebugElement;
  let div: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),
      ReactiveFormsModule,ToastrModule.forRoot(),
      NgbModule],
      declarations: [ EmployeeCreateComponent ],
      providers: [
        NgbActiveModal,
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    div = fixture.nativeElement.querySelector('div');
    div = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
