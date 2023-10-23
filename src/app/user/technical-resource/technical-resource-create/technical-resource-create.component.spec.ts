import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalResourceCreateComponent } from './technical-resource-create.component';

describe('TechnicalResourceCreateComponent', () => {
  let component: TechnicalResourceCreateComponent;
  let fixture: ComponentFixture<TechnicalResourceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalResourceCreateComponent]
    });
    fixture = TestBed.createComponent(TechnicalResourceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
