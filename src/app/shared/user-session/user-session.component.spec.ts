import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserSessionComponent } from './user-session.component';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserSessionComponent', () => {
  let component: UserSessionComponent;
  let fixture: ComponentFixture<UserSessionComponent>;
  let debug: DebugElement;
  let div: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,
      ReactiveFormsModule,ToastrModule.forRoot(),
      CarouselModule, NgbModule],
      declarations: [ UserSessionComponent ],
      providers: [
        NgbActiveModal,
        NgbModal,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    div = fixture.nativeElement.querySelector('div');
    div = fixture.nativeElement.querySelector('div');
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input element ', () => {
   // let inputUserName = debug.query(By.css('#myUser'));
    component.userSessionForm.controls['myUser'].markAsDirty();
    component.userSessionForm.controls['myUser'].markAsTouched();
    fixture.detectChanges();
    expect(div.getElementsByClassName('.fw-lighter.text-danger.small')).toHaveClass;
  });
});
