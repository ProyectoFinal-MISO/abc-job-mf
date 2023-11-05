import { CompanyViewComponent } from './company-view.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';


describe('CompanyViewComponent', () => {
  let component: CompanyViewComponent;
  let fixture: ComponentFixture<CompanyViewComponent>;
  let debug: DebugElement;
  let div: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),
      ReactiveFormsModule,ToastrModule.forRoot(),
      NgbModule],
      declarations: [ CompanyViewComponent ],
      providers: [
        NgbActiveModal,
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    div = fixture.nativeElement.querySelector('div');
    div = fixture.nativeElement.querySelector('div');
  });

  it('should view', () => {
    expect(component).toBeTruthy();
  });
});
