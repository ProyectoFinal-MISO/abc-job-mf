import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalResourceEditComponent } from './technical-resource-edit.component';

describe('TechnicalResourceEditComponent', () => {
  let component: TechnicalResourceEditComponent;
  let fixture: ComponentFixture<TechnicalResourceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
