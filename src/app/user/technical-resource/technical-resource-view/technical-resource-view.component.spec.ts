import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalResourceViewComponent } from './technical-resource-view.component';

describe('TechnicalResourceViewComponent', () => {
  let component: TechnicalResourceViewComponent;
  let fixture: ComponentFixture<TechnicalResourceViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalResourceViewComponent]
    });
    fixture = TestBed.viewComponent(TechnicalResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should view', () => {
    expect(component).toBeTruthy();
  });
});
