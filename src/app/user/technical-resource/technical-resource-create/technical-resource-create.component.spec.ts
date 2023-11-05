import { TechnicalResourceCreateComponent } from './technical-resource-create.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('TechnicalResourceCreateComponent', () => {
  let component: TechnicalResourceCreateComponent;
  let fixture: ComponentFixture<TechnicalResourceCreateComponent>;

  let debug: DebugElement;
  let div: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),
      ReactiveFormsModule,ToastrModule.forRoot(),
      NgbModule],
      declarations: [ TechnicalResourceCreateComponent ],
      providers: [
        NgbActiveModal,
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalResourceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    div = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
